import { Book } from "../models/Book.model.js";
import { DuplicateError, NotFoundError } from "../utils/error.js";

export const createBookService = async ({
  title,
  author,
  isbn,
  publicationDate,
  genre,
  copies,
  description,
  publisher,
}) => {
  console.log("createBookService is triggering");
  const existing = await Book.findOne({ isbn });

  if (existing) throw new DuplicateError("ISBN already exists");

  await Book.create({
    title,
    author,
    isbn,
    publicationDate,
    genre,
    copies,
    description,
    publisher,
  });

  return {
    success: true,
    message: "Book created successfully",
  };
};

export const deleteBookService = async ({ id }) => {
  const deletedBook = await Book.findByIdAndDelete(id);
  if (!deletedBook) throw new Error("Book not found");

  return {
    success: true,
    message: "Book deleted successfully",
  };
};

export const updateBookService = async (id, updateData) => {
  const updated = await Book.findByIdAndUpdate(id, updateData, { new: true });

  if (!updated) throw new NotFoundError("Book not found");

  return {
    success: true,
    message: "Book updated successfully",
  };
};
