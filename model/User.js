var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    email: {type: String, required: true,unique:true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    channel: {type:String,required:true,default:'ecommerce'},
    status:{type:Number,default:0}
}, {timestamps: true});
module.exports = mongoose.model("User", UserSchema);
