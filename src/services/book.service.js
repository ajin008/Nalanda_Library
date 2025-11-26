import { Book } from "../models/Book.model.js";

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

  if (existing) throw new Error("ISBN already exists");

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
