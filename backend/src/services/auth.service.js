import prisma from "../lib/prisma.js";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/error.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../env.js";

const signToken = (userId) => {
  return jwt.sign({ user_id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const createAccount = async ({ email, password }) => {
  // Check if user doesn't exist

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email
    },
  });

  if (existingUser) {
    throw new ConflictError("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });
  const token = signToken(newUser.id);

  return { token, user: newUser };
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const token = signToken(user.id);

  const { passwordHash, ...safeUser } = user;

  return { token, user: safeUser };
};