import axios from "axios";
import prisma from "../lib/prisma.js";
import { AppError, NotFoundError, BadRequestError } from "../utils/error.js";
import { AI_SERVICE_API_URL } from "../env.js";

// Helper: generate a safe fallback title from a message
function generateFallbackTitle(message) {
  if (!message) return "New Chat";
  const cleaned = message.replace(/[#*_`~\[\]]/g, "").trim();
  if (cleaned.length === 0) return "New Chat";
  return cleaned.length > 50 ? cleaned.slice(0, 50) : cleaned;
}

// Helper: update session title in DB (never throws)
async function saveSessionTitle(sessionId, title) {
  try {
    await prisma.session.update({
      where: { id: sessionId },
      data: { title },
    });
    return true;
  } catch (err) {
    console.error(`[Title] Failed to save title to DB for session ${sessionId}:`, err.message);
    return false;
  }
}

// Helper: try AI title generation (never throws)
async function generateAITitle(message) {
  try {
    const titleResponse = await axios.post(
      `${AI_SERVICE_API_URL}/generate-title`,
      { message, memories: [], history: [] },
      { timeout: 10000 }
    );
    const aiTitle = titleResponse.data?.response?.trim();
    if (aiTitle && aiTitle.length > 0) {
      return aiTitle;
    }
    return null;
  } catch (err) {
    console.error("[Title] AI title generation failed:", err.message);
    return null;
  }
}

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

  if (!message || message.trim().length < 1) {
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

  let updatedTitle = null;

  // Generate title if this is the first message OR if the title is still default/empty
  const needsTitle =
    messageCount === 1 ||
    !session.title ||
    session.title === "New Chat" ||
    session.title.trim() === "";

  if (needsTitle) {
    // Layer 1: Try AI title generation
    const aiTitle = await generateAITitle(message);
    if (aiTitle) {
      updatedTitle = aiTitle;
    } else {
      // Layer 2: Fallback to message content
      updatedTitle = generateFallbackTitle(message);
    }
    // Always save — this call never throws
    await saveSessionTitle(session.id, updatedTitle);
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
  return { response: responseText, title: updatedTitle };
};
