import { getAdminStats, getAllUsers } from "../controllers/admin.controller.js";
import { verifyToken } from "../middleware/auth.js";
import express from "express";

const adminRouter = express.Router();

adminRouter.get("/stats", verifyToken, getAdminStats);
adminRouter.get("/all-users", verifyToken, getAllUsers);

export default adminRouter;
