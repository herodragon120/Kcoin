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
    userAPI = require('./routes/API/userAPI'),
    blockAPI = require('./routes/API/blockAPI'),
    adminAPI = require('./routes/API/adminAPI'),
    napTienAPI = require('./routes/API/napTienAPI'),
    ruttienAPI=require('./routes/API/userAPI'),
    trans = require('./controllers/exchange_controller');




mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/KCoin',function (err) {
    if(err){console.log("connect error")}
});
var app = express();
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static('public'));
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
app.get('/', (req, res) => {
    res.render('home');
});
app.use('/block',blockAPI);
app.use('/account',userAPI);
app.use('/transaction',trans);
app.use('/admin',adminAPI);
app.use('/naptien',napTienAPI);
app.use('/rutTien',ruttienAPI);

// const HASH_ALGORITHM = 'sha256';
// let hash = function (data) {
//     let hash = crypto.createHash(HASH_ALGORITHM);
//     hash.update(data);
//     return hash.digest();
// };
// let getAddressFromPublicKey = function (publicKeyHex) {
//     let hash = crypto.createHash(HASH_ALGORITHM);
//     let publicKey = Buffer.from(publicKeyHex, "hex");
//     hash.update(publicKey);
//     return hash.digest().toString("hex");
// }
//
// const WebSocket = require('ws');
//
// const ws = new WebSocket('wss://api.kcoin.club/blocks');
//
// ws.onopen = function () {
//     setInterval(function () {
//         ws.send("") ;
//     },30000)
// };
//
// ws.onmessage = function (data1) {
//     var dataNewBlock = JSON.parse(data1.data);
//
//     if(dataNewBlock.type === "block")
//     {
//         console.log("có block mới");
//         var newBlock = new Block();
//         newBlock.hash = dataNewBlock.data.hash;
//         newBlock.nonce = dataNewBlock.data.nonce;
//         newBlock.version = dataNewBlock.data.version;
//         newBlock.timestamp = dataNewBlock.data.timestamp;
//         newBlock.difficulty = dataNewBlock.data.difficulty;
//         newBlock.transactions = dataNewBlock.data.transactions;
//         newBlock.transactionsHash = dataNewBlock.data.transactionsHash;
//         newBlock.previousBlockHash = dataNewBlock.data.previousBlockHash;
//         Block.findOne({hash: newBlock.hash}, function (err, result) {
//             if(result !== null)
//             {
//                 return( {code: 301, message: "Hash has been used"});
//             }
//             else {
//                 newBlock.save(function (err) {
//                     if(err){
//                         return {code: 500, message: err};
//                     } else {
//                         newBlock.transactions.forEach(hash=> {
//                             napTien.findOne({'hash':hash.hash},function (errr,result1) {
//                                 if(errr){ return {code:401,message:errr}}
//                                 else{
//                                     if(result1===null){
//                                         return {code:401,message:null}
//                                     }else{
//                                         User.findOne({'address':result1.from},function (err1,from) {
//                                             if(err1){return {message:err1}}
//                                             else{
//                                                 if(from===null){
//                                                     return {message:null}
//                                                 }else{
//                                                     from.kcoin_tt=from.kcoin_kd;
//                                                     from.save(function (er2) {
//                                                         if(er2){return {message:er2}}
//                                                     })
//                                                 }
//                                             }
//                                         })
//                                         User.findOne({'address':result1.to},function (er12,userto) {
//                                             if(er12){return {message:er12}}
//                                             else{
//                                                 if(userto===null){
//                                                     return {message:null}
//                                                 }else{
//                                                     userto.kcoin_tt=userto.kcoin_kd;
//                                                     userto.save(function (er22) {
//                                                         if(er22){return {message:er22}}
//                                                     })
//                                                 }
//                                             }
//                                         })
//                                     }
//                                 }
//                             })
//                         })
//
//                         return {code: 200, message: "Block add"}
//                     }
//                 });
//             }
//         })
//     }
// };
// const ws1 = new WebSocket('wss://api.kcoin.club/unconfirmed-transactions');
//
// ws1.onopen = function () {
//     setInterval(function () {
//         ws1.send("");
//     }, 30000)
// };
//
// ws1.onmessage = function (dataTransaction) {
//
//     var index = -1;
//     var dataNewTransaction = JSON.parse(dataTransaction.data);
//     if(dataNewTransaction.type === "transaction")
//     {
//         dataNewTransaction.data.outputs.forEach(function (output) {
//             index = index + 1;
//
//
//
//             User.findOne({'address': output.lockScript.substring(4)}, function (err, result) {
//
//                 console.log("có transaction mới");
//                 if (result !== null) {
//                     if(result.public_key !==  dataNewTransaction.data.inputs[0].unlockScript.substring(4, 548))
//                     {
//                         var newTransaction = new napTien();
//                         newTransaction.hash = dataNewTransaction.data.hash;
//                         newTransaction.from = getAddressFromPublicKey(dataNewTransaction.data.inputs[0].unlockScript.substring(4, 548));
//                         newTransaction.to = output.lockScript.substring(4);
//                         newTransaction.value = output.value;
//                         newTransaction.index = index;
//                         newTransaction.save(function (err)
//                         {
//                             if (err) {
//                                 return {code: 500, message: err};
//                             } else {
//                                 result.kcoin_kd=result.kcoin_kd+newTransaction.value;
//                                 result.save(function (err) {
//                                    if(err){return {message:"Error"};}
//                                 })
//                                 User.findOne({'address':newTransaction.from},function (err,ketqua) {
//                                     if(err){return {message:"error"};}
//                                     else{
//                                         if(ketqua===null){
//                                             return {message:'Khong co'};
//                                         }else{
//                                             ketqua.kcoin_kd=ketqua.kcoin_kd-newTransaction.value;
//                                             ketqua.save(function (err) {
//                                                 if(err){
//                                                     return {message:"Error"};
//                                                 }else{
//                                                     return {message:"OK"};
//                                                 }
//                                             })
//                                         }
//                                     }
//                                 })
//                                 return {code: 200, message: "Transaction add"}
//                             }
//                         });
//                     }
//                 }
//                 else {
//                     return ( {code: 301, message: "Trasaction is wrong"});
//                 }
//             })
//         })
//
//     }
// };
//
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
        ws.send("");
    }, 30000)
};

ws.onmessage = function (data1) {
    var dataNewBlock = JSON.parse(data1.data);

    if (dataNewBlock.type === "block") {
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
            if (result !== null) {
                return ( {code: 301, message: "Hash has been used"});
            }
            else {
                newBlock.save(function (err) {
                    if (err) {
                        return {code: 500, message: err};
                    } else {
                        newBlock.transactions.forEach(hash => {
                            napTien.findOne({'hash': hash.hash}, function (errr, result1) {
                                if (errr) {
                                    return {code: 401, message: errr}
                                }
                                else {
                                    if (result1 === null) {
                                        return {code: 401, message: null}
                                    } else {
                                        User.findOne({'address': result1.from}, function (err1, from) {
                                            if (err1) {
                                                return {message: err1}
                                            }
                                            else {
                                                if (from === null) {
                                                    return {message: null}
                                                } else {
                                                    from.kcoin_tt = from.kcoin_kd;
                                                    from.save(function (er2) {
                                                        if (er2) {
                                                            return {message: er2}
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                        User.findOne({'address': result1.to}, function (er12, userto) {
                                            if (er12) {
                                                return {message: er12}
                                            }
                                            else {
                                                if (userto === null) {
                                                    return {message: null}
                                                } else {
                                                    userto.kcoin_tt = userto.kcoin_kd;
                                                    userto.save(function (er22) {
                                                        if (er22) {
                                                            return {message: er22}
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                }
                            });
                            rutTien.findOne({hash: hash.hash}, function (err, stateRut) {
                                if (err) {
                                    return {message: err}
                                }
                                else {
                                    if(stateRut !== null)
                                    {
                                        stateRut.state = "HOAN_THANH";
                                        stateRut.save(function (er22) {
                                            if (er22) {
                                                return {message: er22}
                                            }
                                        })
                                    }

                                }
                            });
                        })

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
    if (dataNewTransaction.type === "transaction") {
        dataNewTransaction.data.outputs.forEach(function (output) {
            index = index + 1;
            User.findOne({'address': output.lockScript.substring(4)}, function (err, resultNapTien) {


                if (resultNapTien !== null) {
                    console.log("có transaction Nạp Tiền");
                    if (resultNapTien.public_key !== dataNewTransaction.data.inputs[0].unlockScript.substring(4, 548)) {
                        var newTransaction = new napTien();
                        newTransaction.hash = dataNewTransaction.data.hash;
                        newTransaction.from = getAddressFromPublicKey(dataNewTransaction.data.inputs[0].unlockScript.substring(4, 548));
                        newTransaction.to = output.lockScript.substring(4);
                        newTransaction.value = output.value;
                        newTransaction.index = index;
                        newTransaction.time = Math.round(Date.now() / 1000);

                        newTransaction.save(function (err) {
                            if (err) {
                                return {code: 500, message: err};
                            } else {
                                resultNapTien.kcoin_kd = resultNapTien.kcoin_kd + newTransaction.value;
                                resultNapTien.save(function (err) {
                                    if (err) {
                                        return {message: "Error"};
                                    }
                                })
                                User.findOne({'address': newTransaction.from}, function (err, resultGuiTien) {
                                    if (err) {
                                        return {message: "error"};
                                    }
                                    else {
                                        if (resultGuiTien === null) {
                                            return {message: 'Khong co'};
                                        } else {
                                            resultGuiTien.kcoin_kd = resultGuiTien.kcoin_kd - newTransaction.value;
                                            resultGuiTien.save(function (err) {
                                                if (err) {
                                                    return {message: "Error"};
                                                } else {
                                                    return {message: "OK"};
                                                }
                                            })
                                        }
                                    }
                                })
                                return {code: 200, message: "Transaction add"}
                            }
                        });
                    }
                }
                else {
                    return ( {code: 301, message: "Trasaction is wrong"});
                }
            })
        });


        dataNewTransaction.data.inputs.forEach(function (input) {

            User.findOne({'address': getAddressFromPublicKey(input.unlockScript.substring(4, 548))}, function (err, userRutTien) {


                if (userRutTien !== null) {
                    console.log("có transaction Rút Tiền");
                    rutTien.findOne({
                        referencedOutputHash: input.referencedOutputHash,
                        referencedOutputIndex: input.referencedOutputIndex
                    }, function (err, resultRutTien) {
                        if (err) {
                            return {code: 500, message: err};
                        }
                        else {
                            resultRutTien.hash = dataNewTransaction.data.hash;
                            resultRutTien.index = 0;
                            resultRutTien.save(function (err) {
                                if (err) {
                                    return {message: "Error"};
                                }
                                else {
                                    napTien.findOne({hash: dataNewTransaction.data.hash}, function (err, result) {
                                        if (err) {
                                            return {code: 500, message: err};
                                        }
                                        else {
                                            if (result === null) {
                                                userRutTien.kcoin_kd = userRutTien.kcoin_kd + newTransaction.value;
                                                userRutTien.save(function (err) {
                                                    if (err) {
                                                        return {message: "Error"};
                                                    }
                                                })
                                                User.findOne({'address': newTransaction.from}, function (err, userNapTien) {
                                                    if (err) {
                                                        return {message: "error"};
                                                    }
                                                    else {
                                                        if (userNapTien === null) {
                                                            return {message: 'Khong co'};
                                                        } else {
                                                            userNapTien.kcoin_kd = userNapTien.kcoin_kd - newTransaction.value;
                                                            userNapTien.save(function (err) {
                                                                if (err) {
                                                                    return {message: "Error"};
                                                                } else {
                                                                    return {message: "OK"};
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            });

        })
    }
}

