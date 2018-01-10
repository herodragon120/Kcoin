var express = require('express');
var r = express.Router();
var exchange = require('../../controllers/exchange_controller');

r.post('/',function (req,res) {
    exchange.Ruttien(req,res);
})
r.post('/exchange/xacthuc',function (req,res) {
    exchange.postGiaodich(req,res);
})
module.exports = r;