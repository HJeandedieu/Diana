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

const allowedOrigins = [
  "https://diana-six-theta.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without an Origin header
    // (e.g. server-to-server requests)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },

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

app.listen(process.env.PORT || 8080, () => {
  console.log(`Diana API running on port ${process.env.PORT || 8080}`);
});