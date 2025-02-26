import express from "express";
import {
  addCart,
  checkout,
  createReview,
  deleteCart,
  getMe,
  login,
  putCart,
  register,
  updateUserByToken,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", verifyToken, getMe);



authRouter.delete("/checkout", verifyToken, checkout);
authRouter.post("/add/cart", verifyToken, addCart);
authRouter.put("/edit/cart", verifyToken, putCart);
authRouter.put("/user/update/token", verifyToken, updateUserByToken);
authRouter.delete("/delete/cart", verifyToken, deleteCart);
authRouter.post("/review/create/:id", verifyToken, createReview);

export default authRouter;
