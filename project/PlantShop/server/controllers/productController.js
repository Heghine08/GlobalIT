const Product = require("../models/Product");

const getProducts = async (req, res) => {
  const products = await Product.find();

  res.json(products);
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      image,
      category,
      inStock,
    } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      image,
      category,
      inStock,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const recordSales = async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({
        message: "Sales items are required.",
      });
    }

    const updates = items
      .filter(
        (item) =>
          item && item.id && typeof item.quantity === "number" &&
          item.quantity > 0
      )
      .map((item) =>
        Product.findByIdAndUpdate(
          item.id,
          { $inc: { sales: item.quantity } },
          { new: true }
        )
      );

    await Promise.all(updates);

    res.json({ message: "Sales recorded." });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  recordSales,
};