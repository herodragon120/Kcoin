var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GiaoDichHeThong = new Schema({
    hash : String,
    time : Number,
    from : String,
    to : String,
    value : Number
}, {
    collection: 'GiaoDichHeThong'
});


var GiaoDichHeThong = mongoose.model('GiaoDichHeThong',GiaoDichHeThong);

module.exports = GiaoDichHeThong;
