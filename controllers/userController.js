import { Op, where } from "sequelize";
import bcrypt from "bcrypt";
import User from "../model/userModels.js";
import Wishlist from "../model/wishlistModel.js";
import Product from "./productController.js";
import Cart from "../model/cartModel.js";

export const getAllUser = async (req, res) => {
  try {
    const pembeli = await User.findAll({
      where: { role: "pembeli" },
      include: {
        model: Wishlist,
        as: "Wishlists",
        include: { model: Product, as: "Product" },
        model: Cart,
        as: "Carts",
      },
    });
    const myPlaintext = pembeli.password
    const admin = await User.findAll({
      where: { role: "admin" },
    });

    let response = {};

    if (pembeli.length > 0) {
      response.pembeli = pembeli;
    } else {
      response.message_pembeli = "Data pembeli kosong";
    }

    if (admin.length > 0) {
      response.admin = admin;
    } else {
      response.message_admin = "Data admin kosong";
    }

    if (!response.pembeli && !response.admin) {
      return res.status(200).json({ message: "Data kosong" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const user = await User.findAll({
      where: { role },
    });

    if (user.length > 0) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Data kosong" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { role, id } = req.params;
    const user = await User.findOne({
      where: { role, id },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Data kosong" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, balance, pfp } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      role,
      balance,
      pfp,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, balance, pfp } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await User.update(
      { name, email, password: hashedPassword, balance, pfp },
      { where: { id } }
    );
    if (user) {
      const updatedUser = await User.findOne({ where: { id } });
      res.status(200).json({ message: "Data berhasil di update", updatedUser });
    } else {
      res.status(404).json({ message: "User not foundd" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const updatePembeli = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, balance, wishlist, cart, pfp, ProductId } =
      req.body;
    const productExists = await Product.findByPk(ProductId);
    if (!productExists) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }
    const [pembeli] = await Pembeli.update(
      {
        name,
        email,
        password,
        balance,
        wishlist: ProductId,
        pfp,
        cart: ProductId,
      },
      { where: { id } }
    );
    if (!pembeli) {
      res.status(404).json({ error: "pembeli not found" });
    } else {
      const updatedPembeli = await User.findByPk(id);
      res.status(200).json({
        message: "data berhasil di update",
        updatedPembeli,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePembeli = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: "Tidak ada pembeli yang dipilih" });
    }

    const deleted = await User.destroy({
      where: { id: { [Op.in]: ids } }, // Gunakan Op.in agar bisa menghapus banyak ID
    });

    if (deleted === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.status(200).json({ message: "Data berhasil dihapus", deleted });
  } catch (error) {
    console.error("Error deleting pembeli:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

export const addProductToWishlist = async (req, res) => {
  try {
    const { role, id } = req.params; // ID pembeli di URL
    const { ProductId } = req.body; // ProductId dari request body

    // 1. Cek apakah Pembeli dengan ID yang diberikan ada
    const pembeli = await User.findOne({ where: { role: "pembeli", id } });
    if (!pembeli) {
      return res.status(404).json({ error: "Pembeli not found" });
    }

    // 2. Cek apakah Product dengan ProductId yang diberikan ada
    const productExists = await Product.findByPk(ProductId);
    if (!productExists) {
      return res.status(404).json({ error: "Product not found" });
    }

    // 3. Membuat relasi antara Pembeli dan Produk di Wishlist
    // Membuat entry baru di tabel Wishlist
    await Wishlist.create({
      UserId: pembeli.id, // Tidak perlu mengisi PembeliId karena sudah ada di 'pembeli'
      ProductId, // Menyimpan ProductId yang diterima dari body
    });

    res.status(201).json({
      message: "Produk berhasil ditambahkan ke wishlist",
      pembeli,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteWishlist = async (req, res) => {
  try {
    const { role, id } = req.params; // ID pembeli dari URL
    const { ProductId } = req.body; // ID produk dari request body

    // 1. Cek apakah Pembeli dengan ID yang diberikan ada
    const pembeli = await User.findOne({ where: { role: "pembeli", id } });
    if (!pembeli) {
      return res.status(404).json({ error: "Pembeli tidak ditemukan" });
    }

    // 2. Cek apakah produk dengan ProductId yang diberikan ada
    const productExists = await Product.findByPk(ProductId);
    if (!productExists) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    // 3. Cari produk dalam wishlist berdasarkan PembeliId dan ProductId
    const wishlistItem = await Wishlist.findOne({
      where: {
        UserId: id,
        ProductId: ProductId,
      },
    });

    // 4. Jika tidak ditemukan, kembalikan pesan error
    if (!wishlistItem) {
      return res.status(404).json({ error: "Produk tidak ada dalam wishlist" });
    }

    // 5. Hapus produk dari wishlist
    await wishlistItem.destroy();

    res.status(200).json({
      message: "Produk berhasil dihapus dari wishlist",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
