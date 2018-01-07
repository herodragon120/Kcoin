var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var User=new Schema({
    email:String,
    password:String,
    confirm_code:String,
    public_key:String,
    private_key:String,
    kcoin_num:Number
});
module.exports= mongoose.model('User',User);