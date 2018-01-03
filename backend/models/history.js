var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var history = new Schema({
    id: Number,
    from: String,
    to: String,
    value: Number,
    date:{
        type: Date,
        default: new Date()
    }
});

function history(from, to, value) {
    this.from = from;
    this.to = to;
    this.value = value;
}

var history = mongoose.model('History', history);

module.exports = history;