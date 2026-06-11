import { config } from "dotenv";

config({ path: ".env" });

export const { PORT, JWT_SECRET, JWT_EXPIRES_IN } = process.env;
