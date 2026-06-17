import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";

const memoriesRouter = Router();

memoriesRouter.get("/", authenticate, (req, res) => {
  res.send("Fetching all memories");
});

memoriesRouter.put("/:id", authenticate, (req, res) => {
  res.send("Update memory...");
});

memoriesRouter.delete("/:id", authenticate, (req, res) => {
  res.send("Deleting memory...");
});

export default memoriesRouter;
