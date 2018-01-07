var express = require('express'),
    session = require('express-session'),
    passport = require('passport');
    bodyParser = require('body-parser'),
    mongoose=require('mongoose'),
    crypto = require('crypto'),
    https=require('https'),
    util=require('util');
var Block = require ('./models/Block'),
    userController=require('./controllers/user_controller'),
    blockController=require('./controllers/blockControllers')    ;



mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/KCoin',function (err) {
    if(err){console.log("connect error")}
});
var app = express();
app.set('views','./views');
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
app.use(passport.initialize());
app.use(passport.session());
app.listen(3000,function () {
   console.log('Server is listening....');
});

//app.use(user_controller);
app.use('/block',blockController);
app.use('/account',userController);
const WebSocket = require('ws');

const ws = new WebSocket('wss://api.kcoin.club/blocks');

ws.onopen = function () {
    setInterval(function () {
        ws.send("") ;
    },30000)
};

ws.onmessage = function (data1) {
    var dataNewBlock = JSON.parse(data1.data);

    if(dataNewBlock.type === "block")
    {
        console.log("có block mới");
        var newBlock = new Block();
        newBlock.hash = dataNewBlock.data.hash;
        newBlock.nonce = dataNewBlock.data.nonce;
        newBlock.version = dataNewBlock.data.version;
        newBlock.timestamp = dataNewBlock.data.timestamp;
        newBlock.difficulty = dataNewBlock.data.difficulty;
        newBlock.transactions = dataNewBlock.data.transactions;
        newBlock.transactionsHash = dataNewBlock.data.transactionsHash;
        newBlock.previousBlockHash = dataNewBlock.data.previousBlockHash;
        Block.findOne({hash: newBlock.hash}, function (err, result) {
            if(result !== null)
            {
                return( {code: 301, message: "Hash has been used"});
            }
            else {
                newBlock.save(function (err) {
                    if(err){
                        return {code: 500, message: err};
                    } else {
                        return {code: 200, message: "Block add"}
                    }
                });
            }
        })
    }


};
// var url = 'https://api.kcoin.club/blocks';
// https.get(url, function(res){
//     var body = '';
//
//     res.on('data', function(chunk){
//         body += chunk;
//     });
//
//     res.on('end', function(){
//         var data = JSON.parse(body);
//         data.forEach(function(DataItem){
//             Block.findOne({hash:DataItem.hash},function (err,result) {
//                 if(result === null)
//                 {
//                     var newBlock = new Block();
//                     newBlock.hash = DataItem.hash;
//                     newBlock.nonce = DataItem.nonce;
//                     newBlock.version = DataItem.version;
//                     newBlock.timestamp = DataItem.timestamp;
//                     newBlock.difficulty = DataItem.difficulty;
//                     newBlock.transactions = DataItem.transactions;
//                     newBlock.transactionsHash = DataItem.transactionsHash;
//                     newBlock.previousBlockHash = DataItem.previousBlockHash;
//
//                     newBlock.save(function (err) {
//                         if(err){
//                             return {code: 500, message: err};
//                         } else {
//                             return {code: 200, message: "Block add"}
//                         }
//                     })
//                 }
//                 else
//                 {
//                     return( {code: 301, message: "Hash has been used"});
//                 }
//             });
//         });
//         console.log("Hoàn thành")
//     });
// }).on('error', function(e){
//     console.log("Got an error: ", e);
// });
