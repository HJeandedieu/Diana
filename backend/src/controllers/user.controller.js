import {
  updateProfile,
  updatePassword,
  clearAllMemories,
  deleteAccount,
} from "../services/user.service.js";

export const updateProfileController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;
    const user = await updateProfile({ userId, name, email });
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updatePasswordController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    await updatePassword({ userId, currentPassword, newPassword });
    res.json({ success: true, message: "Password updated" });
  } catch (error) {
    next(error);
  }
};

export const clearAllMemoriesController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await clearAllMemories({ userId });
    res.json({ success: true, message: "All memories cleared" });
  } catch (error) {
    next(error);
  }
};

export const deleteAccountController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await deleteAccount({ userId });
    res.json({ success: true, message: "Account deleted" });
  } catch (error) {
    next(error);
  }
};