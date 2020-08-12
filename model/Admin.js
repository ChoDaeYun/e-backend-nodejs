var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AdminSchema = new Schema({
    admin_id: {type: String, required: true,unique:true},
    password: {type: String, required: true},
    auth_lev: {type:Number,default:0}
}, {timestamps: true});
module.exports = mongoose.model("Admin", AdminSchema);
