import { Router } from "express";
import getMessage from "../controllers/chat.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/", authenticate, getMessage);

export default chatRouter;
