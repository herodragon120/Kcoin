var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ruttien=new Schema({
    iduser : String,
    inputs :[],
    outputs :[],
    version : Number,
    state : String,
});
module.exports= mongoose.model('ruttien',ruttien);