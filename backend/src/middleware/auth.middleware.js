import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/error.js";
import { JWT_SECRET } from "../env.js";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader.startsWith("Bearer")) {
      throw new UnauthorizedError("Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;