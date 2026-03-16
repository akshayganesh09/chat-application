import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./routes/user.routes";

import { errorMiddleware } from "./middleware/errorHandler.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Application is up...");
});

app.get("/health", (req, res) => {
  res.status(200).json("Chat server running...");
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use(errorMiddleware);

export default app;
