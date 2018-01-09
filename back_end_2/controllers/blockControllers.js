var express=require('express');
var r=express.Router();

var block=require('../models/Block');
var user=require('../models/User'),
    util=require('util'),
    https=require('https')

/*Get Block from BlockChain API KCoin*/
r.get('/',function (req,res,next) {

});

module.exports = r;

