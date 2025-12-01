import { AppError } from "../utils/error.js";

export const errorHandler = (err, req, res, next) => {
  console.error("Error Message", err.message);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
