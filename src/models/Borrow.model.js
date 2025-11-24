import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
  },
  { timestamps: true }
);

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

export const Borrow = mongoose.model("Borrow", borrowSchema);
