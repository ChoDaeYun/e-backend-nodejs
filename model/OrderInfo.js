var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var OrderInfoSchema = new Schema({
    order_id: {type: String, required: true,unique:true},
    user_id: {type: String, required: true},
    order_datetime: {type: Date, required: true},
    payment_price: {type: Number, default: 0},
    payment_type: {type: String},
    payment_id: {type: String},
    payment_log: {type: String},
    now_state: {type: Number,default: 0},
    now_state_uptime: {type: Date},
    delivery_no: {type: String}
}, {timestamps: true});
module.exports = mongoose.model("OrderInfo", OrderInfoSchema);
