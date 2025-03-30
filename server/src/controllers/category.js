const mongoose = require("mongoose");
const Category = require("../models/category");

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name: name.toLowerCase() });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Category({ name: name.toLowerCase() });
    await newCategory.save();

    res.status(201).json({ message: "Category created successfully", data: newCategory });
  } catch (error) {
    console.error("Error in createCategory:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const existingCategory = await Category.findOne({ name: name.toLowerCase() });
    if (existingCategory && existingCategory._id.toString() !== req.params.id) {
      return res.status(400).json({ message: "Category name already in use" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name: name.toLowerCase() },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category updated successfully", data: updatedCategory });
  } catch (error) {
    console.error("Error in updateCategory:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully", data: deletedCategory });
  } catch (error) {
    console.error("Error in deleteCategory:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all Categories
exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find().select("-__v");
    res.json({ message: "Categories retrieved successfully", data: categories });
  } catch (error) {
    console.error("Error in getCategory:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Category by id
exports.getCategoryById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category retrieved successfully", data: category });
  } catch (error) {
    console.error("Error in getCategoryById:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
