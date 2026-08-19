import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import {
  NotFoundError,
  UnauthorizedError,
  ConflictError,
} from "../utils/error.js";

export const updateProfile = async ({ userId, name, email }) => {
  if (email) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing && existing.id !== userId) {
      throw new ConflictError("Email already in use");
    }
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { ...(name && { name }), ...(email && { email }) },
  });

  const { passwordHash, ...safeUser } = updated;
  return safeUser;
};

export const updatePassword = async ({
  userId,
  currentPassword,
  newPassword,
}) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new NotFoundError("User not found");

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) throw new UnauthorizedError("Current password is incorrect");

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(newPassword, salt);

  await prisma.user.update({ where: { id: userId }, data: { passwordHash } });
};

export const clearAllMemories = async ({ userId }) => {
  await prisma.memory.deleteMany({ where: { userId } });
};

export const deleteAccount = async ({ userId }) => {
  const sessions = await prisma.session.findMany({ where: { userId } });

  for (const session of sessions) {
    await prisma.message.deleteMany({ where: { sessionId: session.id } });
  }

  await prisma.session.deleteMany({ where: { userId } });
  await prisma.memory.deleteMany({ where: { userId } });
  await prisma.user.delete({ where: { id: userId } });
};
