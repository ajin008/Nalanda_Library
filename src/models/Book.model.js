import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
    },
    publicationDate: {
      type: Date,
      required: [true, "Publication date is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
    },
    copies: {
      type: Number,
      required: [true, "Number of copies is required"],
      min: [1, "Copies must be at least 1"],
    },
    description: {
      type: String,
      default: "",
    },
    publisher: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
