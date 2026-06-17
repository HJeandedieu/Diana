import "dotenv/config";
import express from "express";
import prisma from "./lib/prisma.js";
import authRouter from "./routes/auth.routes.js";
import sessionsRouter from "./routes/sessions.routes.js";
import chatsRouter from "./routes/chat.routes.js";
import memoriesRouter from "./routes/memories.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/auth", authRouter);
app.use("/sessions", sessionsRouter);
app.use("/chat", chatsRouter);
app.use("/memories", memoriesRouter);

app.use(errorHandler);


app.get("/", (req, res) => {
  res.send("You have reached Diana API");
});

app.listen(process.env.PORT, () => {
  console.log(`Diana API running on localhost:${process.env.PORT}`);
});
