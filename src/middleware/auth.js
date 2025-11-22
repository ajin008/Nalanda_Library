import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authHeader;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, ENV.jwt_secret);
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
