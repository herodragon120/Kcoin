var express=require('express');
var r=express.Router();

var block=require('../models/Block');
var user=require('../models/User'),
    util=require('util'),
    https=require('https')

/*Get Block from BlockChain API KCoin*/
r.get('/',function (req,res,next) {
var url = 'https://api.kcoin.club/blocks';
    https.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var data = JSON.parse(body);
        console.log("Got a response: ", util.inspect(data,false,null));

    });
}).on('error', function(e){
    console.log("Got an error: ", e);
});
});

module.exports = r;

