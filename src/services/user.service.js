import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { DuplicateError, NotFoundError } from "../utils/error.js";

export const registerUserService = async ({ name, email, password, role }) => {
  console.log("registerUserService is triggering");
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new DuplicateError("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return newUser;
};

export const getUser = async ({ id }) => {
  const user = await User.findById(id);
  if (!user) throw new NotFoundError("User not found");
  return user;
};
