import axios from "axios"
import prisma from "../lib/prisma.js";
import { AppError, NotFoundError, BadRequestError } from "../utils/error.js";

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
  const aiResponse = await axios.post("http://localhost:8000/generate-response", {
    message,
    memories: [],
    history: []
  });

  const responseText = aiResponse.data.response

  const newResponse = await prisma.message.create({
    data: {
      sessionId: session.id,
      role: "assistant",
      content: responseText,
    },
  });
  return responseText;
};
