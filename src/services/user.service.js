import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";

export const registerUserService = async ({ name, email, password, role }) => {
  console.log("registerUserService is triggering");
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return newUser;
};
