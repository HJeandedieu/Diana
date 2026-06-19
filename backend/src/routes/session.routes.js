import { Router } from "express";
import {
  createSession,
  getSessions,
  getMessages,
} from "../controllers/session.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const sessionRouter = Router();

sessionRouter.post("/", authenticate, createSession);

sessionRouter.get("/", authenticate, getSessions);

sessionRouter.get("/:id/messages", authenticate, getMessages);

export default sessionRouter;
