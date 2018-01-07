var express = require('express'),
    crypto = require('crypto'),
    User=require('../models/User');
const ursa = require('ursa');
const _ = require('lodash');
var hbs=require('nodemailer-express-handlebars');

const HASH_ALGORITHM = 'sha256';


var r = express.Router();

let hash = function (data) {
    let hash = crypto.createHash(HASH_ALGORITHM);
    hash.update(data);
    return hash.digest();
};
var nodemailer=require('nodemailer');

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
   if(req.body.email=="" || req.body.password=="" || req.body.confirmpassword=="")
   {
       return res.send("Chưa nhập đầy đủ thông tin");
   }else{
       if(req.body.password.toString()!==req.body.confirmpassword.toString()){

           return res.send("Mật khẩu xác nhận không chính xác");
       }
       else {
            var newuser=new User();
// Tạo privateKey, publicKey, address | <có sử dụng thêm hàm hash>
           let generateAddress = function () {
               let privateKey = ursa.generatePrivateKey(1024, 65537);
               let publicKey = privateKey.toPublicPem();
               newuser.email=req.body.email;
               newuser.password=crypto.createHash('md5').update(req.body.password).digest('hex');
               newuser.public_key=publicKey.toString('hex');
               newuser.private_key=privateKey.toPrivatePem('hex');
               newuser.address=hash(publicKey).toString('hex');
               newuser.kcoin_num=0;
               newuser.confirm_code=0;
           };
           generateAddress();

           User.findOne({'email': newuser.email}, function (err, result) {
               if(result !== null){
                   return res.send( {code: 301, message: "email đã được sử dụng",});
               }else{
                   newuser.save(function (err) {
                       if(err){
                           return res.send({code: 500, message: err}) ;
                       } else {
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
                                   ten:newuser.address
                               }
                           },function (err) {
                               if(err){console.log(err)}
                               else
                               {console.log('thanhcong')}
                           })

                           return res.send({code: 200, message: "Đăng ký thành công,Vào email để xác thực tài khoản"});
                       }
                   })
               }
           });

       }
   }

})
r.get('/:ten',function (req,res) {
    var id=req.params.ten;
    User.findOne({"address":id},function (err,result) {
        if(err){
            res.status(500).send();
        }else{
            if(!result){
                res.status(404).send();
            }else{
                result.confirm_code=1;
                result.save(function (err,resultupdate) {
                    res.send('Xác thực thành công');
                })
            }
        }
    })
})
r.post('/login',function (req,res) {
    if(req.body.id_wallet=="" || req.body.password==""){
        return res.send('Chua nhap day du thong tin');
    }
    else{
        var idwallet=req.body.id_wallet;
        var password=crypto.createHash('md5').update(req.body.password).digest('hex');
        User.findOne({"address": idwallet},function (err,result) {
            if(result.confirm_code==='0'){
                res.send({message:'Tài khoản chưa xác thực'})
            }else{
                if(password ===result.password ){
                    req.session.userwallet = result;
                    req.session.userAddress=result.address;
                    req.session.userKcoin=result.kcoin_num;
                    req.session.userEmail=result.email;
                    req.session.save();
                    res.send({code:200,message:"Đăng nhập thành công"});
                }
            }
        })
    }

});

r.get('/logout',function (req,res) {
    req.session.userwallet = undefined;
    res.send('DA_DANG_XUAT');
})

r.get('/info',function (req,res) {
    res.send({Idwallet : req.session.userAddress,Kcoin:req.session.userKcoin,email: req.session.userEmail});
})

module.exports = r;