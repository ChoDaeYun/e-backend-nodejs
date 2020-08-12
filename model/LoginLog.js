var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var LoginLogSchema = new Schema({
    user_id: {type: String, required: true},
    log_type: {type: String, required: true}
}, {timestamps: true});
module.exports = mongoose.model("LoginLog", LoginLogSchema);
