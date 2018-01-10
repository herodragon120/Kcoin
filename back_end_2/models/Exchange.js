var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var rutTien = new Schema({
    iduser : String,
    hash:String,
    from:String,
    to:String,
    value:Number,
    time: Number,
    index: Number,
    state : String,
    referencedOutputHash: String,
    referencedOutputIndex: Number
}, {
    collection: 'RutTien'
});

module.exports = mongoose.model('RutTien',rutTien);