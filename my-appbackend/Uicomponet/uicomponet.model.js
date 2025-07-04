const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComponentSchema = new Schema({
  name: { type: String, required: true },                     // Component name
  category: { type: String, required: true },                 // e.g., "Button", "Card"
  htmlCode: { type: String, required: true },                 // HTML code
  jsxCode: { type: String, required: true },                  // JSX version
                                        
  description: { type: String },                              // Optional usage note
  Imagename: { type: String },                             // Image filename or URL
  vendorId: { type: Number, required: true },                 // Link to Vender table
  status: { type: String, enum: ['approved', 'rejected'], default: 'approved' },
  
  
}, { collection: "UIComponent", timestamps: true });

module.exports = mongoose.model("UIComponent", ComponentSchema);
