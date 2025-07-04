var mongoose=require("mongoose");
var Schema =mongoose.Schema;
var Category= new Schema({
    PCatgId:{type:String},
    PCatgName:{type:String},
},{collection:"Category"});
 module.exports = mongoose.model("Category",Category);