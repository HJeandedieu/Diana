import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/", authenticate, (req, res) => {
  res.send("Chat loading...");
});

export default chatRouter;
