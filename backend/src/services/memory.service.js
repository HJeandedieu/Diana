import prisma from "../lib/prisma.js";
import { NotFoundError } from "../utils/error.js";

export const fetchMemories = async ({ userId }) => {
  const memories = await prisma.memory.findMany({
    where: { userId },
    orderBy: { importance: "desc" },
  });
  return memories;
};

export const editMemory = async ({ userId, memoryId, content }) => {
  const existing = await prisma.memory.findFirst({
    where: { id: memoryId, userId },
  });
  if (!existing) throw new NotFoundError("Memory not found");

  const updated = await prisma.memory.update({
    where: { id: memoryId },
    data: { content },
  });
  return updated;
};

export const removeMemory = async ({ userId, memoryId }) => {
  const existing = await prisma.memory.findFirst({
    where: { id: memoryId, userId },
  });
  if (!existing) throw new NotFoundError("Memory not found");

  await prisma.memory.delete({ where: { id: memoryId } });
};