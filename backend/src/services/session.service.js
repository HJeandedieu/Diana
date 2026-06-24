import prisma from "../lib/prisma.js";
import { AppError, NotFoundError } from "../utils/error.js";

export const createNewSession = async ({ userId, title }) => {
  const newSession = await prisma.session.create({
    data: {
      title: title,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return newSession;
};

export const getUserSessions = async ({ userId }) => {
  const sessions = await prisma.session.findMany({
    where: {
      userId: userId,
    },
  });

  return sessions;
};

export const getSessionMessages = async ({ userId, sessionId }) => {
  const session = await prisma.session.findFirst({
    where: {
      id: sessionId,
      userId: userId,
    },
  });

  if (!session) {
    throw new NotFoundError("Session not found");
  }

  const messages = await prisma.message.findMany({
    where: {
      sessionId: session.id,
    },
    orderBy: { createdAt: "asc" },
  });

  return messages;
};
