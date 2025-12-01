import { Book } from "../models/Book.model.js";
import {
  createBookService,
  deleteBookService,
  updateBookService,
} from "../services/book.service.js";

export const createBook = async (req, res, next) => {
  console.log("createBook triggering");
  try {
    await createBookService(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBook = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalBooks = await Book.countDocuments();
    const books = await Book.find().skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      message: "Fetched books",
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
      books,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      const notFoundError = new Error("No Book found");
      notFoundError.status = 404;
      return next(notFoundError);
    }

    res.status(200).json({
      success: true,
      message: "book successfully fetched",
      body: book,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    await deleteBookService({ id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedBook = await updateBookService({ id, updatedData: req.body });

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      body: updatedBook,
    });
  } catch (error) {
    next(error);
  }
};

export const searchBooks = async (req, res, next) => {
  try {
    const { q, genre } = req.query;

    const query = {
      $or: [
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } },
        { isbn: { $regex: q, $options: "i" } },
      ],
    };

    if (genre && genre !== "all") {
      query.genre = genre;
    }

    const books = await Book.find(query);

    res.status(200).json({
      success: true,
      message: "Search results",
      books,
    });
  } catch (error) {
    next(error);
  }
};
