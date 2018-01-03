var express = require('express');
var router = express.Router();
var walletController = require('../../controller/walletController');

router.get('/', function (req, res, next) {
    var history_transaction = walletController.list_nearest_transaction(req, res, next);
    res.send(history_transaction);
})

router.post('/login', function (req, res, next) {
    var result = walletController.log_in(req, res, next);
    req.session.save();
})

router.post('/signin', function (req, res, next) {
    var result = walletController.sign_in(req, res);
    // console.log(result)
    if(result.message === "")
        result = {code: 200, message: "Sign In success!!"};
    res.send(result);
})

router.post('/transaction', function (req, res, next) {
    var result = walletController.transaction(req, res);
})

router.get('/transaction', function (req, res, next) {
    walletController.list_nearest_transaction(req, res, next);
})

router.get('/all-transaction', function (req, res, next) {
    walletController.all_transaction(req, res, next)
})

router.get('/logout', function (req, res, next) {
    walletController.log_out(req, res, next);
})
module.exports = router;