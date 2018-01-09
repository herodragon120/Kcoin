var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var napTien = new Schema({
    hash:String,
    from:String,
    to:String,
    value:Number,
    index: Number
}, {
    collection: 'NapTien'
});



var napTien = mongoose.model('NapTien',napTien);

module.exports = napTien;
