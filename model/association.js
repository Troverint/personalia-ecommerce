import Admin from "./adminModel.js";
import Category from "./categoryModel.js";
import User from "./userModels.js";
import Product from "./productModel.js";
import Wishlist from "./wishlistModel.js";
import Stock from "./StockModels.js";
import Cart from "./cartModel.js";
import Review from "./reviewModel.js";

const Association = () => {
  Product.hasMany(Wishlist, {
    foreignKey: "ProductId",
    as: "Wishlists",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  Wishlist.belongsTo(Product, {
    foreignKey: "ProductId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  User.hasMany(Wishlist, {
    foreignKey: "UserId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  Wishlist.belongsTo(User, {
    foreignKey: "UserId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  Product.hasMany(Stock, {
    foreignKey: "ProductId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  Stock.belongsTo(Product, {
    foreignKey: "ProductId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });

  User.hasMany(Cart, {
    foreignKey: "UserId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  Cart.belongsTo(User, {
    foreignKey: "UserId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  Product.hasMany(Cart, {
    foreignKey: "ProductId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  Cart.belongsTo(Product, {
    foreignKey: "ProductId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  Product.hasMany(Review, {
    foreignKey: "ProductId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  Review.belongsTo(Product, {
    foreignKey: "ProductId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  User.hasMany(Review, {
    foreignKey: "UserId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  Review.belongsTo(User, {
    foreignKey: "UserId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  Category.hasMany(Product, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Product.belongsTo(Category, {
    foreignKey: "CategoryId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default Association;
