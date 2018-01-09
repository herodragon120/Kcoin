var express = require('express');
var r = express.Router();
var admin = require('../../controllers/admin_controller');

r.get('/listuser',function (req,res) {
    admin.listuser(req,res);
})
r.get('/listaddress',function (req,res) {
    admin.listaddress(req,res);
})
r.get('/thongso',function (req,res) {
    admin.statistical(req,res);
})
module.exports = r;