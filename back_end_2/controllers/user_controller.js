var express = require('express'),
    crypto = require('crypto'),
    mongoose = require('mongoose')
    User = require('../models/User');
const ursa = require('ursa');
const _ = require('lodash');
var hbs = require('nodemailer-express-handlebars');

const HASH_ALGORITHM = 'sha256';


var r = express.Router();

let hash = function (data) {
    let hash = crypto.createHash(HASH_ALGORITHM);
    hash.update(data);
    return hash.digest();
};
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'kcoin2018',
        pass: 'phuc11296'
    }
});


r.post('/signup',function (req,res) {
   if(req.body.email == "" || req.body.password == "" || req.body.confirmpassword == "")
   {
       return res.send({message:'CHUA_NHAP_THONG_TIN'});
   }else{
       if(req.body.password.toString() !== req.body.confirmpassword.toString()){

           return res.send({message:'MAT_KHAU_KHONG_DUNG'});
       }
       else {
            var newuser = new User();
// Tạo privateKey, publicKey, address | <có sử dụng thêm hàm hash>
           let generateAddress = function () {
               let privateKey = ursa.generatePrivateKey(1024, 65537);
               let publicKey = privateKey.toPublicPem();
               newuser.email = req.body.email;
               newuser.password = crypto.createHash('md5').update(req.body.password).digest('hex');
               newuser.isAdmin = 0;
               newuser.public_key = publicKey.toString('hex');
               newuser.private_key = privateKey.toPrivatePem('hex');
               newuser.address = hash(publicKey).toString('hex');
               newuser.confirm_code = 0;
               newuser.kcoin_tt = 0;
               newuser.kcoin_kd = 0;
           };
           generateAddress();

           User.findOne({'email': newuser.email}, function (err, result) {
               if(result !== null){
                   return res.send( {code: 301, message: "EMAIL_DA_SU_DUNG",});
               }else{
                   newuser.save(function (err) {
                       if(err){
                           return res.send({code: 500, message: err}) ;
                       } else {
                           User.findOne({'email' : newuser.email},function (err,result) {
                               transporter.use('compile',hbs({
                                   viewPath:'views',
                                   extName:'.hbs'
                               }))
                               transporter.sendMail({
                                   from:'kcoin2018@gmail.com',
                                   to: newuser.email,
                                   subject:'Hệ thống quản lý giao dịch Kcoin',
                                   template:'email',
                                   context:{
                                       ten:result._id,
                                       passw:req.body.password
                                   }
                               },function (err) {
                                   if(err){console.log(err)}
                                   else
                                   {console.log('thanhcong')}
                               })
                           })
                           return res.send({code: 200, message: "DANG_KY_THANH_CONG"});
                       }
                   })
               }
           });

       }
   }

})
r.get('/:ten',function (req,res) {
    var id = req.params.ten;
    User.findOne({"_id":id},function (err,result) {
        if(err){
            res.status(500).send();
        }else{
            if(!result){
                res.status(404).send();
            }else{
                result.confirm_code = 1;
                result.save(function (err,resultupdate) {
                    res.send({message:'XAC_THUC_THANHCONG'});
                })
            }
        }
    })
})
r.post('/signin',function (req,res) {
    if(req.body.wallet == "" || req.body.password == ""){
        return res.send({message:'TAI_KHOAN_KHONG_DUNG',wallet:null});
    }
    else{
        var i = req.body.wallet;
        if(i.length == 24){
            var idwallet = mongoose.Types.ObjectId(req.body.wallet);
            var password = crypto.createHash('md5').update(req.body.password).digest('hex');
            User.findOne({"_id": idwallet,"password" : password},function (err,result) {
                if(err){
                    res.send(err);
                }else{
                    if(result !== null){
                        if(result.confirm_code === '0'){
                            res.send({message:'CHUA_XAC_THUC',wallet:null})
                        }else{
                            if(password === result.password ){
                                req.session.isAdmin = result.isAdmin;
                                req.session.wallet = idwallet;
                                req.session.save();
                                res.send({code:200,message:"DANG_NHAP_THANH_CONG",wallet:idwallet});
                            }
                        }
                    }else{
                        return res.json({code:301,message:'TAI_KHOAN_KHONG_DUNG',wallet:null});
                    }
                }
            })
        }else{
            return res.json({code:301,message:'TAI_KHOAN_KHONG_DUNG',wallet:null});
        }

    }

});

r.get('/logout',function (req,res) {
    req.session.isAdmin = undefined;
    req.session.wallet = undefined;
    res.send('DA_DANG_XUAT');
})

r.get('/info',function (req,res) {

})





module.exports = r;