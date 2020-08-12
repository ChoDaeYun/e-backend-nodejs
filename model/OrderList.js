var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var OrderListSchema = new Schema({
    order_id: {type: String, required: true},
    goods_id: {type: String, required: true},
    goods_price: {type: Number,default: 0}
}, {timestamps: true});
module.exports = mongoose.model("OrderList", OrderListSchema);
