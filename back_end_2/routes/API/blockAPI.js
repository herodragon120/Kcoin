var express = require('express');
var r = express.Router();
var block = require('../../controllers/blockControllers');

r.get('/list',function (req,res) {
    block.listblock(req,res);
})
module.exports = r;