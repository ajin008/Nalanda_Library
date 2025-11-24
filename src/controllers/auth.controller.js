import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { setTokenCookie } from "../utils/setTokenCookie.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = generateToken(user);
    setTokenCookie(res, token);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "none",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const signupAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    return res.status(201).json({
      success: true,
      message: "Admin account created",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ADMIN LOGIN
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminUser = await User.findOne({ email });
    if (!adminUser || adminUser.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatched = await bcrypt.compare(password, adminUser.password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = generateToken(adminUser);
    setTokenCookie(res, token);

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      user: {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const logoutAdmin = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "none",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
