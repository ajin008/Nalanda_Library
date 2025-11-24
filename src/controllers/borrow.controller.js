import { Borrow } from "../models/Borrow.model.js";
import { Book } from "../models/Book.model.js";

export const borrowBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;

    if (!bookId) {
      return res
        .status(400)
        .json({ success: false, message: "Book ID is required" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const existingBorrow = await Borrow.findOne({
      userId,
      bookId,
      status: "borrowed",
    });

    if (existingBorrow) {
      return res.status(400).json({
        success: false,
        message:
          "You already borrowed this book. Return it before borrowing again.",
      });
    }

    if (book.copies <= 0) {
      return res.status(400).json({
        success: false,
        message: "Book not available",
      });
    }

    const borrowRecord = await Borrow.create({
      userId,
      bookId,
    });

    book.copies -= 1;
    await book.save();

    return res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      borrow: borrowRecord,
    });
  } catch (error) {
    console.error("Borrow Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const currentBorrowed = async (req, res) => {
  console.log("currentBorrowed is triggering");
  try {
    const userId = req.user.id;

    const borrowedBooks = await Borrow.find({
      userId,
      status: "borrowed",
    }).populate("bookId");

    return res.status(200).json({
      success: true,
      message: "Borrowed books fetched successfully",
      books: borrowedBooks,
    });
  } catch (error) {
    console.error("Fetch Borrowed Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const returnBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required",
      });
    }

    // Find active borrow record
    const borrowRecord = await Borrow.findOne({
      userId,
      bookId,
      status: "borrowed",
    });

    if (!borrowRecord) {
      return res.status(404).json({
        success: false,
        message: "No borrowed record found",
      });
    }

    // Update borrow record
    borrowRecord.status = "returned";
    borrowRecord.returnDate = new Date();
    await borrowRecord.save();

    // Increase available copies
    const book = await Book.findById(bookId);
    book.copies += 1;
    await book.save();

    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
    });
  } catch (error) {
    console.error("Return Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getBorrowStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Total currently borrowed (not returned yet)
    const borrowedCount = await Borrow.countDocuments({
      userId,
      status: "borrowed",
    });

    // Total returned
    const returnedCount = await Borrow.countDocuments({
      userId,
      status: "returned",
    });

    // Total read = all borrow history
    const totalReadCount = borrowedCount + returnedCount;

    return res.status(200).json({
      success: true,
      totalBorrowedCount: borrowedCount,
      totalReturnedCount: returnedCount,
      totalReadCount,
    });
  } catch (error) {
    console.error("Borrow Stats Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getBorrowHistory = async (req, res) => {
  console.log("getBorrowHistory triggering");
  try {
    const userId = req.user.id;

    const history = await Borrow.find({ userId })
      .populate("bookId", "title author isbn genre copies")
      .sort({ borrowedAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Borrow history fetched successfully",
      history,
    });
  } catch (error) {
    console.error("Borrow History Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
