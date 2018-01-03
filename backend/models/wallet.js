var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wallet = new Schema({
    id: Number,
    name: String,
    username: String,
    password: String,
    value: Number,
    history: []
});

function wallet() {
    this.value = 1000;
}

function wallet(username, password, value, name) {
    this.username = username;
    this.password = password;
    this.value = value;
    this.name = name
}

var wallet = mongoose.model('UserWallet', wallet);

module.exports = wallet;