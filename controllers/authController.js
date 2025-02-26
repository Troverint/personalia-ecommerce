import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
import User from "../model/userModels.js";
import Cart from "../model/cartModel.js";
import Product from "./productController.js";
import Review from "../model/reviewModel.js";
import { Sequelize } from "sequelize";
import Stock from "../model/StockModels.js";
import Wishlist from "../model/wishlistModel.js";
dotenv.config();

//LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: "user not found!!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid Password" });
    } else {
      const token = jwt.sign(
        { id: user.id, email: user.email }, //Payload
        process.env.JWT_SECRET, //JWT SECRET
        {
          expiresIn: "1d", //Expired Date
        }
      );

      return res.status(200).json({ msg: "Login successfully", token });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Login failed", error: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { rating, ulasan } = req.body;
    const { id } = req.params;

    const product = await Product.findOne({ where: { id } });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = await Review.create({
      rating,
      ulasan,
      ProductId: id,
      UserId: req.user.id,
    });

    if (review) {
      const allReviews = await Review.findAll({ where: { ProductId: id } });

      let totalRating = 0;
      allReviews.forEach((rev) => {
        totalRating += rev.rating;
      });

      const avgRating = (totalRating / allReviews.length).toFixed(2); 

      await Product.update({ rating: avgRating }, { where: { id } });

      res.status(200).json({ message: "Berhasil", avgRating });
    } else {
      res.status(500).json({ message: "Gagal" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      include: {
        model: Wishlist,
        as: "Wishlists",
        include: { model: Product, as: "Product" },
        model: Cart,
        as: "Carts",
        include: {
          model: Product,
          as: "Product",
          include: {
            model: Stock,
            as: "Stocks",
          },
        },
      }, // Pilih atribut yang ingin ditampilkan
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Failed to get user data", error: error.message });
  }
};

export const updateUserByToken = async (req, res) => {
  try {
    const { name, email, password, balance, pfp } = req.body;

    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : user.password;

    await User.update(
      { name, email, password: hashedPassword, balance, pfp },
      { where: { id: req.user.id } }
    );

    const updatedUser = await User.findOne({ where: { id: req.user.id } });

    res.status(200).json({ message: "Data berhasil di update", updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addCart = async (req, res) => {
  try {
    const { ProductId, size, quantity } = req.body;

    if (!ProductId || !size || !quantity) {
      return res
        .status(400)
        .json({ msg: "ProductId, size, and quantity are required!" });
    }

    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "name", "email", "role"],
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    const product = await Product.findOne({
      where: { id: ProductId },
      attributes: ["id", "price"],
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found!" });
    }

    // Cek stok yang tersedia untuk size tertentu
    const stock = await Stock.findOne({
      where: { ProductId, size },
    });

    if (!stock || stock.quantity < quantity) {
      return res
        .status(400)
        .json({ msg: "Stock not available or insufficient!" });
    }

    // Cek apakah produk dengan size tersebut sudah ada di cart
    const cartItem = await Cart.findOne({
      where: { UserId: req.user.id, ProductId, size },
    });

    if (!cartItem) {
      // Jika belum ada, buat baru
      await Cart.create({
        UserId: req.user.id,
        ProductId,
        size,
        quantity,
        harga_total: product.price * quantity,
      });
    } else {
      // Jika sudah ada, update quantity dan harga total
      const newQuantity = cartItem.quantity + quantity;
      await Cart.update(
        { quantity: newQuantity, harga_total: product.price * newQuantity },
        { where: { id: cartItem.id } }
      );
    }

    // Kurangi stok yang tersedia
    // await Stock.update(
    //   { quantity: stock.quantity - quantity },
    //   { where: { ProductId, size } }
    // );

    // Ambil data user dengan cart yang sudah diperbarui
    const updatedUserCart = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "name"],
      include: {
        model: Cart,
        as: "Carts",
        attributes: ["id", "size", "quantity", "harga_total"],
        include: {
          model: Product,
          as: "Product",
          attributes: ["id", "name", "price"],
        },
      },
    });

    return res.status(201).json(updatedUserCart);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Failed to add product to cart", error: error.message });
  }
};

export const checkout = async (req, res) => {
  try {
    const userId = req.user.id;

    // Ambil data user dan cart-nya
    const user = await User.findOne({
      where: { id: userId },
      attributes: ["id", "role", "balance"], // Ambil saldo user juga
      include: {
        model: Cart,
        as: "Carts",
        include: {
          model: Product,
          as: "Product",
          attributes: ["price"],
          include: {
            model: Stock,
            as: "Stocks",
            attributes: ["ProductId", "size", "quantity"],
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    if (!user.Carts.length) {
      return res.status(400).json({ msg: "Cart is empty!" });
    }

    let totalHarga = user.Carts.reduce(
      (sum, item) => sum + item.Product.price * item.quantity,
      0
    );

    // Tambah biaya pengiriman
    const shippingFee = 100000;
    totalHarga += shippingFee;

    if (user.role === "pembeli") {
      if (user.balance < totalHarga) {
        return res.status(400).json({ msg: "Saldo tidak mencukupi!" });
      }

      // Kurangi saldo user
      await User.update(
        { balance: user.balance - totalHarga },
        { where: { id: userId } }
      );
    }

    // Kurangi stok
    for (const item of user.Carts) {
      await Stock.decrement(
        { quantity: item.quantity },
        { where: { ProductId: item.ProductId, size: item.size } }
      );
    }

    // Hapus semua item dalam cart setelah checkout berhasil
    await Cart.destroy({ where: { UserId: userId } });

    return res.status(200).json({ msg: "Checkout berhasil!" });
  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({ msg: "Server error", error });
  }
};

export const deleteAllCart = async (req, res) => {
  try {
    const { ProductId, size, quantity } = req.body;

    if (!ProductId || !size || !quantity) {
      return res
        .status(400)
        .json({ msg: "ProductId, size, and quantity are required!" });
    }

    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "name", "email", "role"],
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    const product = await Product.findOne({
      where: { id: ProductId },
      attributes: ["id", "price"],
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found!" });
    }

    // Cek stok yang tersedia untuk size tertentu
    const stock = await Stock.findOne({
      where: { ProductId, size },
    });

    if (!stock || stock.quantity < quantity) {
      return res
        .status(400)
        .json({ msg: "Stock not available or insufficient!" });
    }

    const cartItem = await Cart.findOne({
      where: { UserId: req.user.id, ProductId, size },
    });

    if (!cartItem) {
      await Cart.create({
        UserId: req.user.id,
        ProductId,
        size,
        quantity,
        harga_total: product.price * quantity,
      });
    } else {
      // Jika sudah ada, update quantity dan harga total
      const newQuantity = cartItem.quantity + quantity;
      await Cart.update(
        { quantity: newQuantity, harga_total: product.price * newQuantity },
        { where: { id: cartItem.id } }
      );
    }

    // await Stock.update(
    //   { quantity: stock.quantity - quantity },
    //   { where: { ProductId, size } }
    // );

    // Ambil data user dengan cart yang sudah diperbarui
    const updatedUserCart = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "name"],
      include: {
        model: Cart,
        as: "Carts",
        attributes: ["id", "size", "quantity", "harga_total"],
        include: {
          model: Product,
          as: "Product",
          attributes: ["id", "name", "price"],
        },
      },
    });

    return res.status(201).json(updatedUserCart);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Failed to add product to cart", error: error.message });
  }
};

export const putCart = async (req, res) => {
  try {
    const { ProductId, size, quantity } = req.body;

    if (!ProductId || !size || quantity === undefined) {
      return res
        .status(400)
        .json({ msg: "ProductId, size, and quantity are required!" });
    }

    const cartItem = await Cart.findOne({
      where: { UserId: req.user.id, ProductId, size },
      include: {
        model: Product,
        as: "Product",
        attributes: ["id", "name", "price", "image"],
      },
    });

    if (!cartItem) {
      return res.status(404).json({ msg: "Product not found in cart!" });
    }

    const stock = await Stock.findOne({ where: { ProductId, size } });
    if (!stock || stock.quantity < quantity) {
      return res
        .status(400)
        .json({ msg: "Stock not available or insufficient!" });
    }

    await Cart.update(
      { quantity, harga_total: cartItem.Product.price * quantity },
      { where: { id: cartItem.id } }
    );

    const updatedCart = await Cart.findAll({
      where: { UserId: req.user.id },
      include: {
        model: Product,
        as: "Product",
        attributes: ["id", "name", "price", "image"],
      },
    });

    return res.status(200).json({ Carts: updatedCart });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Failed to update cart", error: error.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { size, ProductId } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const deletedCount = await Cart.destroy({
      where: { UserId: userId, ProductId, size },
    });

    if (!deletedCount)
      return res.status(404).json({ message: "Cart item not found" });

    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res
      .status(201)
      .json({ msg: `${role} registered successfully`, newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Registration failed", error: error.message });
  }
};

// export const addCart = async (req, res) => {
//   try {
//     const { ProductId } = req.body;

//     if (!ProductId) {
//       return res.status(400).json({ msg: "ProductId is required!" });
//     }

//     const user = await User.findOne({
//       where: { id: req.user.id },
//       attributes: ["id", "name", "email", "role"],
//     });

//     if (!user) {
//       return res.status(404).json({ msg: "User not found!" });
//     }

//     const product = await Product.findOne({
//       where: { id: ProductId },
//       attributes: ["id", "price"],
//     });

//     if (!product) {
//       return res.status(404).json({ msg: "Product not found!" });
//     }
//     await Cart.create({
//       UserId: req.user.id,
//       ProductId,
//       harga_total: product.price,
//     });

//     const userBy = await User.findOne({
//       where: { id: req.user.id },
//       attributes: ["id", "name"],
//       include: {
//         model: Cart,
//         as: "Carts",
//         attributes: ["id", "harga_total"],
//         include: {
//           model: Product,
//           as: "Product",
//           attributes: ["id", "name"],
//         },
//       },
//     });

//     return res.status(201).json(userBy);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ msg: "Failed to add product to cart", error: error.message });
//   }
// };
