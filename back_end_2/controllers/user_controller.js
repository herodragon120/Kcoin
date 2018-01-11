var crypto = require('crypto'),
    mongoose = require('mongoose'),
    naptien = require('../models/napTien'),
    User = require('../models/User');
const ursa = require('ursa');
const _ = require('lodash');
var hbs = require('nodemailer-express-handlebars');
var ruttien = require('../models/Exchange');
var hethong=require('../models/Transactions');

const HASH_ALGORITHM = 'sha256';



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


exports.signup = function (req, res) {
    if (req.body.email == "" || req.body.password == "" || req.body.confirmpassword == "") {
        return res.send({message: 'CHUA_NHAP_THONG_TIN'});
    } else {
        if (req.body.password.toString() !== req.body.confirmpassword.toString()) {

            return res.send({message: 'MAT_KHAU_KHONG_DUNG'});
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
                if (result !== null) {
                    return res.send({code: 301, message: "EMAIL_DA_SU_DUNG",});
                } else {
                    newuser.save(function (err) {
                        if (err) {
                            return res.send({code: 500, message: err});
                        } else {
                            User.findOne({'email': newuser.email}, function (err, result) {
                                transporter.use('compile', hbs({
                                    viewPath: 'views',
                                    extName: '.hbs'
                                }))
                                transporter.sendMail({
                                    from: 'kcoin2018@gmail.com',
                                    to: newuser.email,
                                    subject: 'Hệ thống quản lý giao dịch Kcoin',
                                    template: 'email',
                                    context: {
                                        ten: result._id,
                                        passw: req.body.password
                                    }
                                }, function (err) {
                                    if (err) {
                                        console.log(err)
                                    }
                                    else {
                                        console.log('thanhcong')
                                    }
                                })
                            })
                            return res.send({code: 200, message: "DANG_KY_THANH_CONG"});
                        }
                    })
                }
            });

        }
    }
}
exports.xacthuc = function (req, res) {
    var id = req.params.ten;
    User.findOne({"_id": id}, function (err, result) {
        if (err) {
            res.status(500).send();
        } else {
            if (!result) {
                res.status(404).send();
            } else {
                result.confirm_code = 1;
                result.save(function (err, resultupdate) {
                    res.send({message: 'XAC_THUC_THANHCONG'});
                })
            }
        }
    })
}
exports.dangnhap = function (req, res) {
    if (req.body.wallet == "" || req.body.password == "") {
        return res.send({message: 'TAI_KHOAN_KHONG_DUNG', wallet: null, is_admin: 0});
    }
    else {
        var i = req.body.wallet;
        if (i.length == 24) {
            var idwallet = mongoose.Types.ObjectId(req.body.wallet);
            var password = crypto.createHash('md5').update(req.body.password).digest('hex');
            User.findOne({"_id": idwallet, "password": password}, function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    if (result !== null) {
                        if (result.confirm_code === '0') {
                            res.send({message: 'CHUA_XAC_THUC', wallet: null, is_admin: 0})
                        } else {
                            if (password === result.password) {
                                req.session.isAdmin = result.isAdmin;
                                req.session.wallet = idwallet;
                                req.session.save();
                                res.send({
                                    is_admin: result.isAdmin,
                                    message: "DANG_NHAP_THANH_CONG",
                                    wallet: idwallet
                                });
                            }
                        }
                    } else {
                        return res.json({
                            code: 301,
                            message: 'TAI_KHOAN_KHONG_DUNG',
                            wallet: null
                        });
                    }
                }
            })
        } else {
            return res.json({code: 301, message: 'TAI_KHOAN_KHONG_DUNG', wallet: null});
        }

    }

};
exports.dangxuat = function (req, res) {
    req.session.isAdmin = null;
    req.session.wallet = null;
    return res.send({mess: 'DANG_XUAT_THANH_CONG'});
}
exports.thongtin2=function (req,res) {
    var id=mongoose.Types.ObjectId(req.session.wallet);
    if(req.session.isAdmin===0){
        User.findOne({'_id' : id},'address kcoin_tt kcoin_kd',function (err,result) {
            if(err){
                res.send({message:err});
            }else{
                if(result===null){
                    res.send({message:'USER_KHONG_CO'});
                }else{
                    console.log(result.kcoin_tt,'nguoi thuong');
                    naptien.find({'to':result.address},function (er,re) {
                        if(er){
                            res.send({message:er});
                        }else{
                            ruttien.find({'from': result.address},function (loi,kq) {
                                if(loi){
                                    res.send({message:loi});
                                }else{
                                    var state='KHOI_TAO';
                                    ruttien.find({'from': result.address, 'state':state },function (loioi,kqkq) {
                                        if(loioi){
                                            res.send({message:loioi})
                                        }else{
                                            res.send({
                                                num_user:0,
                                                listNaptien:re,
                                                listRuttien:kq,
                                                listRuttienKhoitao:kqkq,
                                                kcoin_tt:result.kcoin_tt,
                                                kcoin_kd:result.kcoin_kd,
                                                wallet:req.session.wallet,
                                                user_address:result.address,
                                                is_admin:req.session.isAdmin
                                            });
                                        }

                                    })
                                }
                            })

                        }
                    })
                }
            }
        })
    }
    else{
        User.find({},'email kcoin_tt kcoin_kd',function (err,result) {
            if(err){
                return res.send(err);
            }else{
                    var tongtienTT = 0;
                    var tongtienKD = 0;
                    var songuoiDung = result.length;
                    result.forEach(a => {
                        tongtienKD = tongtienKD+a.kcoin_kd;
                        tongtienTT = tongtienTT+a.kcoin_tt;
                    })
                User.findOne({'_id' : id},'address kcoin_tt kcoin_kd',function (err,user) {
                    if(err){
                        res.send({message:err});
                    }else{
                        if(user===null){
                            res.send({message:'USER_KHONG_CO'});
                        }else{
                            console.log('kcoin_tt:' +user.kcoin_tt);
                            console.log('kcoin_kd:' +user.kcoin_kd);
                            naptien.find({'to':user.address},function (er,re) {
                                if(er){
                                    res.send({message:er});
                                }else{
                                    ruttien.find({'from': user.address},function (loi,kq) {
                                        if(loi){
                                            res.send({message:loi});
                                        }else{
                                            var state='KHOI_TAO';
                                            ruttien.find({'from': user.address, 'state':state},function (l,r) {
                                                if(l){
                                                    res.send({message:l});
                                                }else{
                                                    res.send({
                                                        num_user:songuoiDung,
                                                        kcoin_kdhethong:tongtienKD,
                                                        kcoin_tthethong:tongtienTT,
                                                        kcoin_tt:user.kcoin_tt,
                                                        kcoin_kd:user.kcoin_kd,
                                                        listNaptien:re,
                                                        listRuttien:kq,
                                                        listRuttienKhoitao:r,
                                                        wallet:req.session.wallet,
                                                        user_address:user.address,
                                                        is_admin:req.session.isAdmin
                                                    });
                                                }
                                            })

                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }

        })
    }

}



