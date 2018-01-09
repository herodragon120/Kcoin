var express = require('express');
var r = express.Router();
var naptien = require('../../controllers/napTienController');

r.get('/address',function (req,res) {
    naptien.taodiachi(req,res);
})
module.exports=r;