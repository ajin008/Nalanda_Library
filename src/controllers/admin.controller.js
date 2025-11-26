import { Book } from "../models/Book.model.js";
import { Borrow } from "../models/Borrow.model.js";
import { User } from "../models/User.model.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();

    const totalInventory = await Book.aggregate([
      { $group: { _id: null, totalCopies: { $sum: "$copies" } } },
    ]);

    const borrowedCount = await Borrow.countDocuments({ status: "borrowed" });

    // Registered members
    const membersCount = await User.countDocuments({ role: "user" });

    return res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      stats: {
        totalBooks,
        totalInventory: totalInventory[0]?.totalCopies || 0,
        borrowedCount,
        availableCopies: (totalInventory[0]?.totalCopies || 0) - borrowedCount,
        membersCount,
      },
    });
  } catch (error) {
    console.error("Stats Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    console.log("getAllUsers triggered");

    const users = await User.find({ role: "user" }, "-password").sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
