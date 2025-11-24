import express from "express";
import {
  createBook,
  deleteById,
  getAllBook,
  getBookById,
  searchBooks,
  updateBook,
} from "../controllers/book.controller.js";
import { verifyToken } from "../middleware/auth.js";

const bookRouter = express.Router();

bookRouter.post("/create", verifyToken, createBook);
bookRouter.get("/getAllBook", verifyToken, getAllBook);
bookRouter.delete("/deleteById/:id", verifyToken, deleteById);
bookRouter.get("/getById/:id", verifyToken, getBookById);
bookRouter.put("/update/:id", verifyToken, updateBook);
bookRouter.get("/search", verifyToken, searchBooks);

export default bookRouter;
