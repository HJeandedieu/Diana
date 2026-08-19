import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import {
  updateProfileController,
  updatePasswordController,
  clearAllMemoriesController,
  deleteAccountController,
} from "../controllers/user.controller.js";

const usersRouter = Router();

usersRouter.put("/profile", authenticate, updateProfileController);
usersRouter.put("/password", authenticate, updatePasswordController);
usersRouter.delete("/memories", authenticate, clearAllMemoriesController);
usersRouter.delete("/", authenticate, deleteAccountController);

export default usersRouter;
