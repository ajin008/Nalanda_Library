import { authUser } from "../middleware/authUser.js";
import {
  createBookService,
  deleteBookService,
} from "../services/book.service.js";
import { registerUserService } from "../services/user.service.js";

export const root = {
  registerUser: async ({ name, email, password, role }) => {
    return await registerUserService({ name, email, password, role });
  },

  createBook: async (args, context) => {
    console.log("Create book resolver is triggering");
    const isVerified = await authUser(context);
    return await createBookService(args);
  },

  deleteBook: async ({ bookId }, context) => {
    console.log("delete book resolver is triggering");
    await authUser(context);
    return await deleteBookService({ id: bookId });
  },
};
