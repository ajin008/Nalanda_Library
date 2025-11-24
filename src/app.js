import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import bookRouter from "./routes/book.routes.js";
import { ENV } from "./config/env.js";
import borrowRouter from "./routes/borrow.routes.js";
import adminRouter from "./routes/admin.route.js";

const app = express();

app.use(
  cors({
    origin: ENV.cors,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);
app.use("/api/admin", adminRouter);
export default app;
