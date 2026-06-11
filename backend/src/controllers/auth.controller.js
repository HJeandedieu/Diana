import { createAccount, loginUser } from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const result = await createAccount(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "User Logged in",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
