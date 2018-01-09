var express = require('express');
var r = express.Router();
var trans = require('../models/Exchange');
var nodemailer=require('nodemailer');
var User = require('../models/User')
var hbs = require('nodemailer-express-handlebars');
const ursa = require('ursa');
const _ = require('lodash');
const crypto = require('crypto');

const HASH_ALGORITHM = 'sha256';

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'kcoin2018',
        pass: 'phuc11296'
    }
});

r.post('/exchange/:id',function (req,res) {
    if(req.params.id.length !== 24){
        res.send({message:'WALLET_ERROR'})
    }else{
        var idwallet = mongoose.Types.ObjectId(req.params.id);
        var addressNhan = req.body.address;
        var money = req.body.money;
        var newTrans = new trans();
        newTrans.iduser = idwallet;
        newTrans.outputs.push({value: money,lockScript:'ADD '+addressNhan});
        newTrans.version = 1;
        newTrans.state = 'Khoi tao';
        newTrans.save(function (err) {
            if(err){res.send(err);}
            else{
                User.findOne({'_id':idwallet},function (err,result) {
                    if(err){
                        return res.send(err);
                    }else{
                        if(result === null){
                            res.send({message:'KHONG_CO_NGUOI_DUNG'});
                        }
                        else{
                            if(result.kcoin_tt<money){
                                return res.send({message:'KHONG_DU_TIEN'});
                            }else{
                                transporter.use('compile',hbs({
                                    viewPath:'views',
                                    extName:'.hbs'
                                }))
                                transporter.sendMail({
                                    from:'kcoin2018@gmail.com',
                                    to: result.email,
                                    subject:'Hệ thống quản lý giao dịch Kcoin',
                                    template:'exchange',
                                    context:{
                                        idwallet:idwallet,
                                        idtrans:newTrans._id,
                                        addressNhan:addressNhan,
                                        money:money
                                    }
                                },function (err) {
                                    if(err){console.log(err)}
                                    else
                                    {console.log('thanhcong')}
                                })
                                res.send({message:'KHOI_TAO'});
                            }
                        }
                        }
                    })
                }
        })
    }
})

r.get('/exchange/:idwallet/:idtrans',function (req,res) {
    var idwallet = req.params.idwallet;
    var idtrans = mongoose.Types.ObjectId(req.params.idtrans);
    var idwalletObj = mongoose.Types.ObjectId(req.params.idwallet);
    trans.findOne({'iduser':idwallet,'_id':idtrans},function (err,result) {
        if(err){
           return res.send({message:err});
        }else{
            if(result === null){
                return res.send({message:'KHONG_CO_GIAO_DICH'});
            }else{
                result.state = 'DANG_XU_LY';
                result.save(function (err) {
                    if(err){return res.send({message:err});}
                    else {
                        User.findOne({'_id': idwalletObj},function (err,datauser) {
                            if(err){ return res.send({message:err});}
                            else{
                                if(datauser === null){
                                    return res.send({message:'NULL'})
                                }else{
                                    datauser.kcoin_kd = datauser.kcoin_tt-result.outputs[0].value;
                                    datauser.save(function (err) {
                                        if(err){ return res.send(err);}
                                        else{
                                            return res.send({message:'CAP_NHAT_KHA_DUNG_DANG_XU_LY'});
                                        }
                                    })
                                }
                            }
                        })
                    }
                })

            }
        }
    })
})
module.exports = r;