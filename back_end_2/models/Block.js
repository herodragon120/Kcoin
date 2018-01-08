var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var Block = new Schema({
    hash: String,
    nonce: Number,
    version: Number,
    timestamp: String,
    difficulty:Number,
    transactions:[],
    transactionsHash: String,
    previousBlockHash:String
}, {
    collection: 'Block'
});

function Block(hash, nonce, version, timestamp, difficulty, transactions, transactionsHash,previousBlockHash ) {
    this.hash = hash;
    this.nonce = nonce;
    this.version = version;
    this.timestamp = timestamp;
    this.difficulty = difficulty;
    this.transactions = transactions;
    this.transactionsHash = transactionsHash;
    this.previousBlockHash = previousBlockHash;
}

var Block = mongoose.model('Block',Block);

module.exports = Block;
