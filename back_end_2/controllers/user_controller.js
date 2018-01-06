var express = require('express'),
    crypto = require('crypto');

var r = express.Router();

r.post('/signup',function (req,res) {
    var email = req.body.txtEmail,
        pass = crypto.createHash('md5').update(req.body.txtPassWord).digest('hex');
    return res.send(pass);
})

r.post('/login',function (req,res) {
    console.log(req.body);
    if(req.body.user_name=='phuc' && req.body.password=='123'){
        req.session.user_name = req.body.user_name;
        return res.send('DANG_NHAP_THANH_CONG');
    }
    return res.send('DANG_NHAP_THAT_BAI');
});

r.get('/logout',function (req,res) {
    req.session.user_name = undefined;
    res.send('DA_DANG_XUAT');
})

r.get('/info',function (req,res) {
    res.send(req.session.user_name);
})

module.exports = r;