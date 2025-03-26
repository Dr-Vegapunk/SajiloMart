
const Category = require("../models/category");
const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  try {
    const { title, price, description, category, stock, images, ratings } = req.body;

    if (!title || !price || !description || !category || !stock || !images) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }
    // Find the category by name
    const foundCategory = await Category.findOne({ name: category });

    if (!foundCategory) {
        return res.status(400).json({ message: "Category not found" });
    }
    const newProduct = new Product({
      title,
      price,
      stock,
      category: foundCategory._id,
      description,
      images,        // ✅ Now correctly extracted as an array
      ratings: ratings || [], // ✅ Default to empty array if not provided
      averageRating: ratings?.length ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length) : 0
    });

    await newProduct.save();

    res.status(201||200).json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📦 Get all products
exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// 📦 Get a product by id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// 📦 Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { title, price, description, category, stock, images, ratings } = req.body;

    if (!title && !price && !description && !category && !stock && !images) {
      return res.status(400).json({ message: "At least one field is required for update" });
    }

    const updatedProduct = {
      ...(title && { title }),
      ...(description && { description }),
      ...(price && { price }),
      ...(stock && { stock }),
      ...(category && { category }),
      ...(images && { images }), 
      ...(ratings && { ratings }),
    };

    const product = await Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📦 Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }};