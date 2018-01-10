var express = require('express');
var r = express.Router();
var user = require('../../controllers/user_controller');

r.post('/signin',function (req,res) {
    user.dangnhap(req,res);
})

r.post('/signup',function (req,res) {
    user.signup(req,res);
})

r.get('/getinfo',function (req,res) {
    user.thongtin(req,res);
})

r.get('/xacthuc/:ten',function (req,res) {
    user.xacthuc(req,res);
})
r.get('/logout',function (req,res) {
    user.dangxuat(req,res);
})
module.exports = r;