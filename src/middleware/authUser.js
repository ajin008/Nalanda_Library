import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export function authUser(context) {
  const token = context.req.cookies.token;
  if (!token) throw new Error("Unauthorized");

  return jwt.verify(token, ENV.jwt_secret);
}
