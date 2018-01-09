var express = require('express'),
    crypto = require('crypto'),
    mongoose=require('mongoose')
User = require('../models/User');
const ursa = require('ursa');
const _ = require('lodash');
var hbs = require('nodemailer-express-handlebars');
var r = express.Router();

// quyền admin

r.get('/listuser/',function (req,res) {
    if(req.session.isAdmin === undefined)
    {
        return res.send({message:'KHONG_ADMIN'});
    }
    else {
        if(req.session.isAdmin === 0){
            return res.send({message:'KHONG_ADMIN'});
        }else{
            User.find({},'email address kcoin_tt kcoin_kd',function (err,result) {
                if(err){
                    return res.send(err);
                }else{
                    if(result === null){
                        return res.send(null);
                    }else{
                        return res.json(result);
                    }
                }
            })
        }
    }
})

r.get('/statistical',function (req,res) {
    if(req.session.isAdmin === undefined)
    {
        return res.send({message:'KHONG_ADMIN'});
    }
    else {
        if(req.session.isAdmin === 0){
            return res.send({message:'KHONG_ADMIN'});
        }else{
            User.find({},'email kcoin_tt kcoin_kd',function (err,result) {
                if(err){
                    return res.send(err);
                }else{
                    if(result === null){
                        return res.send(null);
                    }else{
                        var tongtienTT = 0;
                        var tongtienKD = 0;
                        var songuoiDung = result.length;
                        result.forEach(a => {
                            tongtienKD = tongtienKD+a.kcoin_kd;
                            tongtienTT = tongtienTT+a.kcoin_kd;
                        })
                        return res.json({songuoidung:songuoiDung,tongtienKD:tongtienKD,tongtienTT:tongtienTT});
                    }
                }
            })
        }
    }
})

module.exports = r;