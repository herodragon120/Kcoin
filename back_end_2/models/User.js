var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var User=new Schema({
    email:String,
    password:String,
    isAdmin:Number,
    confirm_code:String,
    public_key:String,
    private_key:String,
    address: String,
    kcoin_tt:Number,
    kcoin_kd:Number
},{collection:'user'});

function User(email, password, confirm_code, public_key, private_key, address, kcoin_num ) {
    this.email = email;
    this.password = password;
    this.confirm_code = confirm_code;
    this.public_key = public_key;
    this.private_key = private_key;
    this.address = address;
    this.kcoin_num = kcoin_num;
}
module.exports= mongoose.model('user',User);