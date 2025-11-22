import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { loginLimiter, signupRatelimiter } from "../middleware/rateLimit.js";
import { verifyToken } from "../middleware/auth.js";

const authRoute = express.Router();

authRoute.post("/register", signupRatelimiter, registerUser);
authRoute.post("/login", loginLimiter, loginUser);
authRoute.post("/logout", logoutUser);

export default authRoute;
