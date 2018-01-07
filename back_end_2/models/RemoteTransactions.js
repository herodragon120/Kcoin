var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var RemoteTransaction=new Schema({
    hash:String,
    from:String,
    to:String,
    value:Number,
    date:{
        type:Date,
        default: new Date()
    }
});
module.exports= mongoose.model('RemoteTransaction',RemoteTransaction);