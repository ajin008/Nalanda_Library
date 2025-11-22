import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { ENV } from "./config/env.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ENV.cors,
    credentials: true,
  })
);

app.use("/api/auth", authRoute);

export default app;
