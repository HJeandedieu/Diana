import "dotenv/config";
import cors from "cors";
import express from "express";
import authRouter from "./routes/auth.routes.js";
import sessionRouter from "./routes/session.routes.js";
import chatRouter from "./routes/chat.routes.js";
import memoriesRouter from "./routes/memories.routes.js";
import usersRouter from "./routes/users.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/chat", chatRouter);
app.use("/api/memories", memoriesRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("You have reached Diana API");
});

app.listen(process.env.PORT, () => {
  console.log(`Diana API running on localhost:${process.env.PORT}`);
});
