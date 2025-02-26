import express from "express";

import {
  addStock,
  addStockAlone,
  createProduct,
  createProductWithStock,
  deleteProduct,
  deleteStock,
  getAllcategory,
  getAllProduct,
  getCart,
  getCategoryByName,
  getProductByCategory,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";
import { deleteCart } from "../controllers/authController.js";

const productRouter = express.Router();

productRouter.get("/product", getAllProduct);
productRouter.get("/product/:id", getProductById);
productRouter.post("/product/post", createProduct);
productRouter.put("/product/update/:id", updateProduct);
productRouter.get("/category", getAllcategory);
productRouter.get("/category/:name", getCategoryByName);
productRouter.delete("/product/delete/:id", deleteProduct);
productRouter.post("/product/post", createProduct);
productRouter.post("/product/stock", createProductWithStock);
productRouter.post("/create/stock", addStockAlone);
productRouter.put("/stock/add/:id", addStock);
productRouter.get("/product/category", getProductByCategory);
productRouter.delete("/delete/cart/", deleteCart);
productRouter.get("/cart", getCart);

export default productRouter;
