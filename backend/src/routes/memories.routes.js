import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import {
  getMemories,
  updateMemory,
  deleteMemory,
} from "../controllers/memory.controller.js";

const memoriesRouter = Router();

memoriesRouter.get("/", authenticate, getMemories);
memoriesRouter.put("/:id", authenticate, updateMemory);
memoriesRouter.delete("/:id", authenticate, deleteMemory);

export default memoriesRouter;