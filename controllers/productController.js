import Product from "../model/productModel.js";
import db from "../config/connection.js";
import Stock from "../model/StockModels.js";
import Review from "../model/reviewModel.js";
import User from "../model/userModels.js";
import Cart from "../model/cartModel.js";
import Category from "../model/categoryModel.js";

//

export const getAllProduct = async (req, res) => {
  try {
    const product = await Product.findAll({
      include: [
        {
          model: Stock,
          as: "Stocks",
        },
        {
          model: Review,
          as: "Reviews",
          include: {
            model: User,
            as: "User",
          },
        },
        {
          model: Category,
          as: "Category",
        },
      ],
    });
    if (product.length === 0) {
      res.json({ message: "data kosong" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const product = await Product.findAll({
      where: { category },
      include: {
        model: Stock,
        as: "Stocks",
      },
    });
    if (product.length === 0) {
      res.json({ message: "data kosong" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Stock,
          as: "Stocks",
        },
        {
          model: Review,
          as: "Reviews",
          include: {
            model: User,
            as: "User",
          },
        },
      ],
    });
    if (!product) {
      res.status(404).json({ error: "product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, rating, stock, image, CategoryId } =
      req.body;

    const product = await Product.create(
      {
        name,
        description,
        price,
        rating,
        image,
        CategoryId,
        Stocks: stock,
      },
      {
        include: [Stock],
      }
    );

    res.status(200).json({ message: "Produk berhasil didaftarkan", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllcategory = async (req, res) => {
  try {
      const category = await Category.findAll(
        {
        include: [
          {
            model: Product,
            as: "Products",
          },
        ]
      }
    );
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "data kosong" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message  });
  }
};


export const getCategoryByName = async (req, res) => {
  const categoryName = req.params.name; 
  try {
    const category = await Category.findOne({
      where: { category_name: categoryName },
      include: [{ model: Product, as: "Products" }],
    });

    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};



export const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { size, quantity } = req.body;

    const stock = await Stock.findOne({
      where: {
        ProductId: id,
        size: size,
      },
    });

    if (!stock) {
      return res.status(404).json({ message: "Stock tidak ditemukan!" });
    }

    if (quantity > stock.quantity) {
      return res.status(400).json({
        message: "Jumlah quantity yang diminta melebihi stok yang tersedia!",
      });
    }

    const newQuantity = stock.quantity - quantity;

    await Stock.update(
      { quantity: newQuantity },
      { where: { ProductId: id, size: size } }
    );

    return res.status(200).json({
      message: `Stock untuk produk dengan size ${size} berhasil dikurangi sebanyak ${quantity}.`,
      newQuantity,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const addStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { size, quantity } = req.body;

    const stock = await Stock.findOne({
      where: {
        ProductId: id,
        size: size,
      },
    });

    if (!stock) {
      await Stock.create({
        ProductId: id,
        size,
        quantity,
      });
      res.status(200).json({
        message: `stock ${size} berhasil ditambahkan, dengan jumlah sebanyak ${quantity}`,
      });
    }

    const newQuantity = stock.quantity + quantity;

    await Stock.update(
      { quantity: newQuantity },
      { where: { ProductId: id, size: size } }
    );

    return res.status(200).json({
      message: `Stock untuk produk dengan size ${size} berhasil ditambah sebanyak ${quantity}.`,
      newQuantity,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, rating, category, image } =
      req.body;
    const product = Product.update(
      {
        name,
        description,
        price,
        stock,
        rating,
        image,
        category,
      },
      { where: { id } }
    );
    if (product) {
      const updatedProduct = await Product.findByPk(id);
      res.status(200).json({
        message: "product berhasil diupdate",
        updatedProduct,
      });
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.destroy({ where: { id } });
    if (product) {
      res.status(200).json({ message: "product berhasil dihapus" });
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//create product include Stock
export const createProductWithStock = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
    });

    if (!product) return res.status(500).json({ message: "value undefined" });

    res.status(200).json(product);
    // }
  } catch (error) {
    res.status(400).json({ message: "invalid data at stock" });
  }
};

export const addStockAlone = async (req, res) => {
  try {
    const { size, quantity, ProductId } = req.body;
    const stock = await Stock.create({
      size,
      quantity,
      ProductId: ProductId,
    });
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findAll({
      include: [
        {
          model: User,
          as: "User", // Pastikan alias sesuai dengan yang didefinisikan di model
        },
        {
          model: Product,
          as: "Product", // Pastikan alias sesuai dengan yang didefinisikan di model
        },
      ],
    });

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Gagal mengambil data cart", error });
  }
};

export default Product;

// export const buyProduct = () =>{
//   try {
//     const {Product}
//   } catch (error) {

//   }
// }
