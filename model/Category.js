var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CategorySchema = new Schema({
    category_id: {type: String, required: true,unique:true},
    name: {type: String, required: true},
    depth: {type: Number, default:0},
    parent_id: {type:String}
}, {timestamps: true});
module.exports = mongoose.model("Category", CategorySchema);
