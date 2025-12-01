import { Borrow } from "../models/Borrow.model.js";
import { Book } from "../models/Book.model.js";

export const borrowBook = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;

    if (!bookId) {
      const error = new Error("Book ID is required");
      error.status = 400;
      return next(error);
    }

    const book = await Book.findById(bookId);
    if (!book) {
      const error = new Error("Book not found");
      error.status = 404;
      return next(error);
    }

    const existingBorrow = await Borrow.findOne({
      userId,
      bookId,
      status: "borrowed",
    });

    if (existingBorrow) {
      const error = new Error(
        "You already borrowed this book. Return it before borrowing again."
      );
      error.status = 400;
      return next(error);
    }

    if (book.copies <= 0) {
      const error = new Error("Book not available");
      error.status = 400;
      return next(error);
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
    next(error);
  }
};

export const currentBorrowed = async (req, res, next) => {
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
    next(error);
  }
};

export const returnBook = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;

    if (!bookId) {
      const error = new Error("Book ID is required");
      error.status = 400;
      return next(error);
    }

    const borrowRecord = await Borrow.findOne({
      userId,
      bookId,
      status: "borrowed",
    });

    if (!borrowRecord) {
      const error = new Error("No borrowed record found");
      error.status = 404;
      return next(error);
    }

    borrowRecord.status = "returned";
    borrowRecord.returnDate = new Date();
    await borrowRecord.save();

    const book = await Book.findById(bookId);
    book.copies += 1;
    await book.save();

    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getBorrowStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const borrowedCount = await Borrow.countDocuments({
      userId,
      status: "borrowed",
    });

    const returnedCount = await Borrow.countDocuments({
      userId,
      status: "returned",
    });

    const totalReadCount = borrowedCount + returnedCount;

    return res.status(200).json({
      success: true,
      totalBorrowedCount: borrowedCount,
      totalReturnedCount: returnedCount,
      totalReadCount,
    });
  } catch (error) {
    next(error);
  }
};

export const getBorrowHistory = async (req, res, next) => {
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
    next(error);
  }
};

export const mostBorrowedBooks = async (req, res, next) => {
  try {
    const report = await Borrow.aggregate([
      {
        $group: {
          _id: "$bookId",
          borrowCount: { $sum: 1 },
        },
      },
      { $sort: { borrowCount: -1 } },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      {
        $project: {
          _id: 1,
          borrowCount: 1,
          title: "$book.title",
          author: "$book.author",
          genre: "$book.genre",
          isbn: "$book.isbn",
          copies: "$book.copies",
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Most borrowed books fetched",
      report,
    });
  } catch (error) {
    next(error);
  }
};
