var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var GoodsSchema = new Schema({
    id: {type: Number, required: true,index:true,unique:true},
    name: {type: String, required: true},
    category: {type: String, required: true},
    thum_img: {type:String,required:true},
    contents: {type:String,required:true},
    price: {type:String,default:0},
    sale: {type:Number,default:0,max:100},
    sns_img: {type:String,required:true}
}, {timestamps: true});
module.exports = mongoose.model("Goods", GoodsSchema);
