import db from "../config/connection.js";
import User from "./userModels.js";
import Product from "./productModel.js";
import Wishlist from "./wishlistModel.js";
import Admin from "./adminModel.js";
import Association from "./association.js";
import Stock from "./StockModels.js";
import Cart from "./cartModel.js";
import Review from "./reviewModel.js";
Association();
await db.sync({ alter: true });


