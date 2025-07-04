const express = require("express");
const router = express.Router();
const UIComponent = require("./uicomponet.model");

// ✅ Add new component
router.post("/addcomponent", async (req, res) => {
  try {
    const component = new UIComponent(req.body);
    await component.save();
    res.status(201).send("Component added successfully");
  } catch (err) {
    console.error("Add Error:", err);
    res.status(400).send("Error saving component");
  }
});

// ✅ Get all components
router.get("/allcomponents", async (req, res) => {
  try {
    const components = await UIComponent.find();
    res.send(components);
  } catch (err) {
    res.status(500).send("Error retrieving components");
  }
});

// ✅ Get component by ID
router.get("/component/:id", async (req, res) => {
  try {
    const component = await UIComponent.findById(req.params.id);
    if (!component) return res.status(404).send("Component not found");
    res.send(component);
  } catch (err) {
    res.status(400).send("Invalid ID or error");
  }
});

// ✅ Get components by vendor ID
router.get("/vendor/:vendorId", async (req, res) => {
  try {
    const components = await UIComponent.find({ vendorId: req.params.vendorId });
    res.send(components);
  } catch (err) {
    res.status(400).send("Vendor components not found");
  }
});

// ✅ Get components by category
router.get("/category/:category", async (req, res) => {
  try {
    const components = await UIComponent.find({ category: req.params.category });
    res.send(components);
  } catch (err) {
    res.status(400).send("Category not found");
  }
});

// ✅ Count total components
router.get("/componentcount", async (req, res) => {
  try {
    const count = await UIComponent.countDocuments();
    res.send({ count });
  } catch (err) {
    res.status(500).send("Error getting count");
  }
});

// ✅ Update component (by ID)
router.put("/updatecomponent/:id", async (req, res) => {
  try {
    const updated = await UIComponent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).send("Component not found");
    res.send("Component updated successfully");
  } catch (err) {
    res.status(400).send("Update failed");
  }
});

// ✅ Delete component (by ID)
router.delete("/deletecomponent/:id", async (req, res) => {
  try {
    const deleted = await UIComponent.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Component not found");
    res.send("Component deleted successfully");
  } catch (err) {
    res.status(400).send("Delete failed");
  }
});

// ✅ Update status (approve/reject)
router.put("/updatestatus/:id/:status", async (req, res) => {
  const { id, status } = req.params;
  const validStatus = ["approved", "rejected"];
  if (!validStatus.includes(status)) {
    return res.status(400).send("Invalid status");
  }

  try {
    await UIComponent.updateOne({ _id: id }, { status });
    res.send("Status updated");
  } catch (err) {
    res.status(400).send("Status update failed");
  }
});

module.exports = router;
