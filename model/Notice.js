var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var NoticeSchema = new Schema({
    board_id: {type: Number, required: true,unique:true},
    title: {type: String, required: true},
    contents: {type: String,required:true },
    open_state:{type:Number,required:true },
    viewcnt:{type:Number,default:0}
}, {timestamps: true});
module.exports = mongoose.model("Notice", NoticeSchema);
