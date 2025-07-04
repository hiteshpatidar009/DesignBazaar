// var mongoose = require("mongoose");
// var Schema=mongoose.Schema;
// var Vender = new Schema ({
//     VUserId:{type:String},
//     VUserPass:{type:String},
//     VenderName:{type:String},
//     VContact:{type:Number},
//     VEmail:{type:String},
//     VPicName:{type:String},
//     Vid:{type:Number},
//     Status:{type:String},

// },{collection:"Vender"});
// module.exports=mongoose.model("Vender",Vender);

const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const VenderSchema = new mongoose.Schema({
  VUserId: { type: String },
  VUserPass: { type: String },
  VenderName: { type: String },
  VContact: { type: Number },
  VEmail: { type: String },
  VPicName: { type: String },
  Status: { type: String }, 
}, {
  collection: "Vender",
  timestamps: true,
});

// 🔥 Auto-generate Vid (Vender ID)
VenderSchema.plugin(AutoIncrement, { inc_field: "Vid" });

module.exports = mongoose.model("Vender", VenderSchema);
