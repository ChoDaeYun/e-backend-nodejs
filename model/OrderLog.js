var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var OrderLogSchema = new Schema({
    order_id: {type: String, required: true},
    log_type: {type: String, required: true},
    now_state: {type: Number,default: 0},
    admin_id: {type: String},
    user_id: {type: String}
}, {timestamps: true});
module.exports = mongoose.model("OrderLog", OrderLogSchema);
