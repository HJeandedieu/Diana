import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";

const sessionRouter = Router();

sessionRouter.post("/", authenticate, (req, res) => {
  res.send("Creating new session...");
});

sessionRouter.get("/", authenticate, (req, res) => {
  res.send("Fetching all sessions...");
});

sessionRouter.get("/:id/messages", authenticate, (req, res) => {
  res.send("Fetching session messages");
});

export default sessionRouter;
