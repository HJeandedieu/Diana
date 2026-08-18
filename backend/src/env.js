import { config } from "dotenv";

config({ path: ".env" });

export const { PORT, JWT_SECRET, JWT_EXPIRES_IN, AI_SERVICE_API_URL } = process.env;
