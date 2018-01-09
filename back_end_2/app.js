var express = require('express'),
    session = require('express-session'),
    passport = require('passport');
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    crypto = require('crypto'),
    https = require('https'),
    util = require('util');
var Block = require ('./models/Block'),
    User = require('./models/User'),
    napTien = require('./models/napTien'),
    userController = require('./controllers/user_controller'),
    blockController = require('./controllers/blockControllers'),
    adminController = require('./controllers/admin_controller'),
    napTienController = require('./controllers/napTienController')
    trans = require('./controllers/exchange_controller');



mongoose.Promise = global.Promise;
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
app.use('/transaction',trans);
app.use('/admin',adminController);
app.use('/napTien',napTienController);

const HASH_ALGORITHM = 'sha256';
let hash = function (data) {
    let hash = crypto.createHash(HASH_ALGORITHM);
    hash.update(data);
    return hash.digest();
};
let getAddressFromPublicKey = function (publicKeyHex) {
    let hash = crypto.createHash(HASH_ALGORITHM);
    let publicKey = Buffer.from(publicKeyHex, "hex");
    hash.update(publicKey);
    return hash.digest().toString("hex");
}

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
const ws1 = new WebSocket('wss://api.kcoin.club/unconfirmed-transactions');

ws1.onopen = function () {
    setInterval(function () {
        ws1.send("");
    }, 30000)
};

ws1.onmessage = function (dataTransaction) {

    var index = -1;
    var dataNewTransaction = JSON.parse(dataTransaction.data);
    if(dataNewTransaction.type === "transaction")
    {
        dataNewTransaction.data.outputs.forEach(function (output) {
            index = index + 1;



            User.findOne({'address': output.lockScript.substring(4)}, function (err, result) {
                console.log("có transaction mới");
                if (result !== null) {
                    if(result.public_key !==  dataNewTransaction.data.inputs[0].unlockScript.substring(4, 548))
                    {
                        var newTransaction = new napTien();
                        newTransaction.hash = dataNewTransaction.data.hash;
                        newTransaction.from = getAddressFromPublicKey(dataNewTransaction.data.inputs[0].unlockScript.substring(4, 548));
                        newTransaction.to = output.lockScript.substring(4);
                        newTransaction.value = output.value;
                        newTransaction.index = index;
                        newTransaction.save(function (err)
                        {
                            if (err) {
                                return {code: 500, message: err};
                            } else {
                                return {code: 200, message: "Transaction add"}
                            }
                        });
                    }
                }
                else {
                    return ( {code: 301, message: "Trasaction is wrong"});
                }
            })
        })

    }
};

