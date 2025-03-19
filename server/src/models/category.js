const mongoose = require("mongoose");

// 📂 Category Schema
const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
}, { timestamps: true });

// Convert name to lowercase before saving
CategorySchema.pre("save", function (next) {
    this.name = this.name.toLowerCase();
    next();
});

// Create and export the model
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category; // ✅ This line is required!
