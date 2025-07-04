const express = require("express");
const Categoryrouter = express.Router();
const Category = require("./Category.module");

// ✅ Create Category
Categoryrouter.post("/add", async (req, res) => {
  try {
    const { PCatgId, PCatgName, feature } = req.body;
    const newCatg = new Category({ PCatgId, PCatgName, feature });
    await newCatg.save();
    res.status(201).send("Category created successfully");
  } catch (err) {
    res.status(400).send("Error creating category: " + err.message);
  }
});

// ✅ Get All Categories
Categoryrouter.get("/all", async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (err) {
    res.status(500).send("Failed to fetch categories");
  }
});

// ✅ Get Category by ID
Categoryrouter.get("/:id", async (req, res) => {
  try {
    const catg = await Category.findById(req.params.id);
    if (!catg) return res.status(404).send("Category not found");
    res.send(catg);
  } catch (err) {
    res.status(400).send("Error fetching category");
  }
});

// ✅ Update Category
Categoryrouter.put("/update/:id", async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).send("Category not found");
    res.send("Category updated successfully");
  } catch (err) {
    res.status(400).send("Update failed: " + err.message);
  }
});

// ✅ Delete Category
Categoryrouter.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Category not found");
    res.send("Category deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting category");
  }
});

// ✅ Toggle feature ON/OFF (Bonus)
Categoryrouter.put("/feature/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send("Category not found");

    category.feature = !category.feature;
    await category.save();

    res.send(`Feature status toggled to ${category.feature}`);
  } catch (err) {
    res.status(500).send("Failed to toggle feature");
  }
});

module.exports = Categoryrouter;
