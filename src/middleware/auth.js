import { ENV } from "../config/env.js";
import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  // console.log("cookies received ", req.cookies);
  const token = req.cookies.token;

  // console.log("token:", token);
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, ENV.jwt_secret);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token verification error:", err);

    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
