import axios from "axios";
import prisma from "../lib/prisma.js";
import { AppError, NotFoundError, BadRequestError } from "../utils/error.js";
import { AI_SERVICE_API_URL } from "../env.js";

export const fetchChatResponse = async ({ userId, sessionId, message }) => {
  const session = await prisma.session.findFirst({
    where: {
      id: sessionId,
      userId: userId,
    },
  });

  if (!session) {
    const error = new NotFoundError("Session not found");
    throw error;
  }

  if (!message || message.trim().length < 0) {
    const error = new BadRequestError("Message can not be empty");
    throw error;
  }

  const newMessage = await prisma.message.create({
    data: {
      sessionId: session.id,
      role: "user",
      content: message,
    },
  });

  const messageCount = await prisma.message.count({
    where: { sessionId: session.id },
  });

  if (messageCount === 1) {
    const titleResponse = await axios.post(
      `${AI_SERVICE_API_URL}/generate-title`,
      { message, memories: [], history: [] },
    );
    const title = titleResponse.data.response;

    await prisma.session.update({
      where: { id: session.id },
      data: { title },
    });
  }

  const userMemories = await prisma.memory.findMany({
    where: { userId },
    orderBy: { importance: "desc" },
    take: 5,
  });

  const aiResponse = await axios.post(
    `${AI_SERVICE_API_URL}/generate-response`,
    {
      message,
      memories: userMemories.map((m) => ({
        type: m.memoryType,
        content: m.content,
        importance: m.importance,
      })),
      history: [],
    },
  );

  const responseText = aiResponse.data.response;

  const conversation = [
    { role: "user", content: message },
    { role: "assistant", content: responseText },
  ];

  const memoriesResponse = await axios.post(
    `${AI_SERVICE_API_URL}/extract-memory`,
    { conversation },
  );
  const extractedMemories = memoriesResponse.data;

  for (const memory of extractedMemories) {
    const existing = await prisma.memory.findFirst({
      where: { userId, memoryType: memory.type },
    });

    if (existing) {
      await prisma.memory.update({
        where: { id: existing.id },
        data: { content: memory.content, importance: memory.importance },
      });
    } else {
      await prisma.memory.create({
        data: {
          userId,
          memoryType: memory.type,
          content: memory.content,
          importance: memory.importance,
        },
      });
    }
  }

  const newResponse = await prisma.message.create({
    data: {
      sessionId: session.id,
      role: "assistant",
      content: responseText,
    },
  });
  return responseText;
};
