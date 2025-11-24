import express from "express";
import {
  loginAdmin,
  loginUser,
  logoutAdmin,
  logoutUser,
  registerUser,
  signupAdmin,
} from "../controllers/auth.controller.js";
import { loginLimiter, signupRatelimiter } from "../middleware/rateLimit.js";

const authRoute = express.Router();

authRoute.post("/register", signupRatelimiter, registerUser);
authRoute.post("/login", loginLimiter, loginUser);
authRoute.post("/logout", logoutUser);
authRoute.post("/admin/signup", signupAdmin);
authRoute.post("/admin/login", loginAdmin);
authRoute.post("/admin/logout", logoutAdmin);

export default authRoute;
