import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  borrowBook,
  currentBorrowed,
  getBorrowHistory,
  getBorrowStats,
  returnBook,
} from "../controllers/borrow.controller.js";

const borrowRouter = express.Router();

borrowRouter.post("/borrow", verifyToken, borrowBook);
borrowRouter.get("/currentBorrowed", verifyToken, currentBorrowed);
borrowRouter.post("/return", verifyToken, returnBook);
borrowRouter.get("/stats", verifyToken, getBorrowStats);
borrowRouter.get("/history", verifyToken, getBorrowHistory);

export default borrowRouter;
