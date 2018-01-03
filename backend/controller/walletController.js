var history = require('../models/history');
var wallet = require('../models/wallet');
var md5 = require('md5');

exports.list_nearest_transaction = function (req, res) {
    var trans = [];
    var from = req.query.username;
    history.find({$or:[ {"from":req.query.username}, {"to": req.query.username}]}, function (err, result) {
        if(err)
            return res.send({code: 500, message:err})
        result.forEach(function (item) {
            console.log(item)
            if(trans.length<10){
                console.log("add 1")
                trans.push(item);
            } else{
                return trans;
            }
        });
        res.send({code: 200 , message:"Get history successfull!", data: trans});
    })
}

exports.all_transaction = function (req, res) {
    var trans = [];
    history.find({}, function (err, result) {
        if(err)
            return res.send({code: 500, message: err})
        res.send({code: 200, data: result, message:"Get history successfull!"})
    })
}

exports.log_in = function (req, res, next) {
    console.log(req.body)
    if(req.body.username === '' || req.body.password === '' || req.body.username === null || req.body.password === null){
        res.send({code:301, message:"username or password not correct"})
    }

    var username = req.body.username;
    var password = req.body.password;
    wallet.findOne({"username":username}, function (err, result) {
        if(md5(password) === result.password){
            req.user = result.username;
            req.session.user = result;
            req.session.save();
            // console.log(req.session)
            res.send({code:200, message:"Log in success", user:result} )
        }
    })
}

// exports.log_in = passport.authenticate('local-signin', {
//     successRedirect: '/a',
//     failureRedirect: '/login',
//     failureFlash: 'Invalid username or password.',
//     successFlash: 'Success.'
// });

exports.sign_in = function (req, res) {
    if(checkSigninInfo(req))
        return {code: 301, message: "not enough info"}

    var newWallet = new wallet();
    newWallet.username = req.body.username;
    newWallet.password = md5(req.body.password);
    newWallet.name = req.body.name;
    newWallet.value = 1000;

    wallet.findOne({"username": newWallet.username}, function (err, result) {
        if(result !== null){
            return( {code: 301, message: "username has been used"});
        }else{
            newWallet.save(function (err) {
                if(err){
                    return {code: 500, message: err};
                } else {
                    return {code: 200, message: "Sign In success!!"}
                }
            })
        }
    });
}

exports.transaction = function (req, res) {
    console.log(req.body.from)
    if(req.body.from === null || typeof (req.body.from) === 'undefined' )
        return res.send({code:301, message:"please Login First!"})
    wallet.findOne({ username: req.body.reciever }, function(error,touser){
        if(req.body.value < 0)
            return res.send({code: 301, message:"The value of transaction must be positive"});
        if(error)
            res.send(error);
        else{
            if(touser !== null){
                var value = parseFloat(touser.value) + parseFloat(req.body.value);
                touser.set({value: value });
                touser.save(function (err, user) {
                    if (err) return res.send(err);
                });

                wallet.findOne({ username: req.body.from }, function(error,fromuser){
                    if(error)
                        res.send(error);
                    else{
                        var value = fromuser.value - req.body.value;
                        fromuser.set({value: value });
                        fromuser.save(function (err, user) {
                            if (err) return res.send(err);
                        });
                    }
                })

                var newHistory = {
                    from: req.body.from,
                    to: req.body.reciever,
                    value: req.body.value,
                    date: new Date()
                }
                // newHistory.from = req.body.from;
                // newHistory.to = req.body.reciever;
                // newHistory.value = req.body.value;
                history.create(newHistory, function (err, result) {
                    if(err) return res.send(err)
                    else return res.send(result)
                })
            }
            else{
                res.send({code:200, message:"Successfull!"})
            }
        }
    })
}

exports.log_out = function (req, res, next) {
    req.logout();
}

function checkSigninInfo(req) {
    if(req.body.username === null || req.body.password === null || req.body.username === "" || req.body.password === "")
        return true;
    return false;
}