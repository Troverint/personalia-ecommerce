import express from "express";
import {
  addProductToWishlist,
  deletePembeli,
  getAllUser,
  getUserByRole,
  getUserById,
  createUser,
  updateUser,
  deleteWishlist,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/user", getAllUser);
userRouter.get("/user/:role", getUserByRole);
userRouter.get("/user/:role/:id", getUserById);
userRouter.post("/user/post", createUser);
userRouter.put("/user/update/:id", updateUser);
userRouter.delete("/pembeli/delete", deletePembeli);
userRouter.put("/:role/wishlist/:id", addProductToWishlist);
userRouter.delete("/:role/delete/wishlist/:id", deleteWishlist);

export default userRouter;
