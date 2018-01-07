var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose=require('mongoose'),
    crypto = require('crypto'),
    https=require('https'),
    util=require('util');
var Block = require ('./models/Block'),
    blockController=require('./controllers/blockControllers')    ;


mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/Kcoin',function (err) {
    if(err){console.log("connect error")}
});
var app = express();
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: 'jsdf7389isacuy28',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000*60*60*24}
}))

app.listen(3000,function () {
   console.log('Server is listening....');
});

//app.use(user_controller);
app.use('/block',blockController);
const WebSocket = require('ws');

const ws = new WebSocket('wss://api.kcoin.club/blocks');
    var url = 'https://api.kcoin.club/blocks';
https.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var data = JSON.parse(body);

    for(var i=0; i < data.length;i++){
        var newBlock = new Block();
        newBlock.hash = data[i].hash;
        newBlock.nonce = data[i].nonce;
        newBlock.version = data[i].version;
        newBlock.timestamp = data[i].timestamp;
        newBlock.difficulty = data[i].difficulty;
        newBlock.transactions = data[i].transactions;
        newBlock.transactionsHash = data[i].transactionsHash;
        newBlock.previousBlockHash = data[i].previousBlockHash;

        Block.findOne({'hash' : newBlock.hash},function (err,result) {
            if(result===null)
            {
                newBlock.save(function (err) {
                    if(err){
                        return {code: 500, message: err};
                    } else {
                        return {code: 200, message: "Block add"}
                    }
                })
            }
            else
            {
                return( {code: 301, message: "Hash has been used"});
            }
        });
    }
    });
}).on('error', function(e){
    console.log("Got an error: ", e);
});