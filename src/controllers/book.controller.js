import { Book } from "../models/Book.model.js";
import { createBookService } from "../services/book.service.js";

export const createBook = async (req, res) => {
  console.log("createBook triggering");
  try {
    await createBookService(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
    });
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllBook = async (req, res) => {
  console.log("get all book with pagination");

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
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getBookById = async (req, res) => {
  console.log("getBookById is triggering");
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(400).json({ success: false, message: "No Book found" });
    }

    res.status(200).json({
      success: true,
      message: "book successfully fetched",
      body: book,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteById = async (req, res) => {
  console.log("deleteById is triggering");
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Delete error: ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateBook = async (req, res) => {
  console.log("updateBook is triggering");
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      body: updatedBook,
    });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const searchBooks = async (req, res) => {
  console.log("searchBooks triggering");
  try {
    const { q, genre } = req.query;
    console.log(q, genre);

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

    console.log("fetched books:", books);

    res.status(200).json({
      success: true,
      message: "Search results",
      books,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
