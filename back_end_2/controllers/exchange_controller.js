var exchangeTracsaction = require('../models/Exchange');
var napTien = require('../models/napTien');
var nodemailer=require('nodemailer');
var User = require('../models/User');
var util = require('util');
var hbs = require('nodemailer-express-handlebars');
const ursa = require('ursa');
const _ = require('lodash');
const crypto = require('crypto');
var Block = require ('../models/Block');
var  request = require('request');
var  mongoose = require('mongoose');

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



exports.postGiaodich = function (req,res) {
    var idwallet = req.body.idwallet;
    var addressNhan = req.body.addressNhan;
    var money_kd = req.body.money_kd;
    var money = req.body.money;
    var idtrans = req.body.idtrans;

    createTransaction(idwallet, addressNhan, money_kd, money, function (data) {

        var jsonDataObj = JSON.stringify(data);
        console.log(jsonDataObj);
        request({
            url: 'https://api.kcoin.club/transactions',
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            version: 1,
            json: data
        }, function(error, response, body){
            console.log(body);
        });
    })
    var idtransObj = mongoose.Types.ObjectId(idtrans);
    var idwalletObj = mongoose.Types.ObjectId(idwallet);

    exchangeTracsaction.findOne({'iduser':idwallet,'_id':idtransObj},function (err,result) {
        if(err){
            return res.send({message:err});
        }else{
            if(result === null){
                return res.send({message:'KHONG_CO_GIAO_DICH'});
            }
            else
            {
                result.state = 'DANG_XU_LY';
                result.time = Math.round(Date.now() / 1000);

                result.save(function (err) {
                    if(err){return res.send({message:err});}
                })

            }
        }
    })
}

exports.Ruttien = function (req,res) {
    if(req.session.wallet.length !== 24){
        res.send({message:'WALLET_ERROR'})
    }else{
        var idwallet = mongoose.Types.ObjectId(req.session.wallet);
        User.findOne({_id : idwallet}, function (err, result) {
            if(result.kcoin_tt < req.body.money){
                return res.send({message:'KHONG_DU_TIEN'});
            }
            else{
                var newTrans = new exchangeTracsaction();
                newTrans.iduser = idwallet;
                newTrans.hash = "";
                newTrans.from = result.address;
                newTrans.to = req.body.address;
                newTrans.value = req.body.money;
                newTrans.index = null;
                newTrans.state = 'Khoi tao';
                newTrans.time = Math.round(Date.now() / 1000);
                newTrans.referencedOutputHash = "";
                newTrans.referencedOutputIndex = 0;
                newTrans.save(function (err)
                {
                    if(err)
                    {
                        return res.send(err);
                    }
                    else
                    {
                        if(result.kcoin_tt < req.body.money){
                            return res.send({message:'KHONG_DU_TIEN'});
                        }
                        else{
                            kiemTraGiaoDichRutTien(idwallet, function (transaction) {
                                newTrans.referencedOutputHash = transaction[0].referenceOutputsHashes;
                                newTrans.referencedOutputIndex = transaction[0].index;
                                newTrans.save(function (err) {
                                    if(err)
                                    {
                                        return res.send(err);
                                    }
                                })
                            })
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
                                    idwallet : idwallet,
                                    addressNhan: req.body.address,
                                    money_kd: result.kcoin_kd,
                                    money: req.body.money,
                                    idtrans:newTrans._id

                                }
                            },function (err) {
                                if(err){console.log(err)}
                                else
                                {console.log('thanhcong')}
                            })
                            res.send({message:'KHOI_TAO'});
                        }
                    }
                })
            }
        })

    }
}




function kiemTraGiaoDichRutTien(idTransaction, callback) {

    let transaction = [];

    exchangeTracsaction.find({iduser: idTransaction}, function (err, resultRut) {
        var current_second = Math.round(Date.now() / 1000);
        if(resultRut.length > 1)
        {
            napTien.find({time: {$gte:resultRut[resultRut.length -  2].time, $lte: current_second}, to: resultRut[resultRut.length -  1].from}, function (err, resultNap) {
                if(resultNap.length >= 1)
                {
                    resultNap.forEach(function (itemNap) {
                        transaction.push({referenceOutputsHashes: itemNap.hash, index: itemNap.index});
                    })
                    transaction.push({referenceOutputsHashes: resultRut[resultRut.length -  2].hash, index: resultRut[resultRut.length -  2].index});
                    callback(transaction);
                }
                else {
                    transaction.push({referenceOutputsHashes: resultRut[resultRut.length -  2].hash, index: resultRut[resultRut.length -  2].index});
                    callback(transaction);
                }
            })
        }
        if (resultRut.length === 1)
        {
            napTien.find({to: resultRut[0].from}, function (err, resultNap) {
                resultNap.forEach(function (itemNap) {
                    transaction.push({referenceOutputsHashes: itemNap.hash, index: itemNap.index});
                })
                callback(transaction);
            })

        }

    })
}
function  findInfoUser(id, callback)
{
    User.findOne({_id: mongoose.Types.ObjectId(id)}, function (err, result) {
        if(err){ return res.send({message:err});}
        else{
            key = {
                publicKey: result.public_key,
                privateKey: result.private_key,
                address: result.address
            }
            callback(key);
        }
    })
}

// Convert a transaction to binary format for hashing or checking the size
let toBinary = function (transaction, withoutUnlockScript) {
    let version = Buffer.alloc(4);
    version.writeUInt32BE(transaction.version);
    let inputCount = Buffer.alloc(4);
    inputCount.writeUInt32BE(transaction.inputs.length);
    let inputs = Buffer.concat(transaction.inputs.map(input => {
        // Output transaction hash
        let outputHash = Buffer.from(input.referencedOutputHash, 'hex');
        // Output transaction index
        let outputIndex = Buffer.alloc(4);
        // Signed may be -1
        outputIndex.writeInt32BE(input.referencedOutputIndex);
        let unlockScriptLength = Buffer.alloc(4);
        // For signing
        if (!withoutUnlockScript) {
            // Script length
            unlockScriptLength.writeUInt32BE(input.unlockScript.length);
            // Script
            let unlockScript = Buffer.from(input.unlockScript, 'binary');
            return Buffer.concat([ outputHash, outputIndex, unlockScriptLength, unlockScript ]);
        }
        // 0 input
        unlockScriptLength.writeUInt32BE(0);
        return Buffer.concat([ outputHash, outputIndex, unlockScriptLength]);
    }));
    let outputCount = Buffer.alloc(4);
    outputCount.writeUInt32BE(transaction.outputs.length);
    let outputs = Buffer.concat(transaction.outputs.map(output => {
        // Output value
        let value = Buffer.alloc(4);
        value.writeUInt32BE(output.value);
        // Script length
        let lockScriptLength = Buffer.alloc(4);
        lockScriptLength.writeUInt32BE(output.lockScript.length);
        // Script
        let lockScript = Buffer.from(output.lockScript);
        return Buffer.concat([value, lockScriptLength, lockScript ]);
    }));
    return Buffer.concat([ version, inputCount, inputs, outputCount, outputs ]);
};
// Tạo chữ ký
let createSignature = function (message, privateKeyHex) {
    // Create private key form hex
    let privateKey = ursa.createPrivateKey(Buffer.from(privateKeyHex, 'hex'));
    // Create signer
    let signer = ursa.createSigner(HASH_ALGORITHM);
    // Push message to verifier
    signer.update(message);
    // Sign
    return signer.sign(privateKey, 'hex');
};
// Sign transaction
let signTransaction = function (transaction, keys) {
    let message = toBinary(transaction, true);
    transaction.inputs.forEach((input, index) => {
        let key = keys[index];
        let signature = createSignature(message, key.privateKey);
        // Genereate unlock script
        input.unlockScript = 'PUB ' + key.publicKey + ' SIG ' + signature;
    });
};





function createTransaction(idwallet, addressReceive, MONEY, BOUNTY, callback) {

    findInfoUser(idwallet, function (key) {
        let bountyTransaction = {
            version: 1,
            inputs: [],
            outputs: []
        };

        kiemTraGiaoDichRutTien(idwallet, function (transaction) {
            // Chứa địa chỉ nhận tiền
            let destinations = [
                addressReceive
            ];

            let keys = [];

            //Thêm input cho transaction
            transaction.forEach(hash => {
                bountyTransaction.inputs.push({
                    referencedOutputHash: hash.referenceOutputsHashes,
                    referencedOutputIndex: parseInt(hash.index),
                    unlockScript: ''
                });
                keys.push(key);
            });


            // Tiền dư sẽ được trả về chính địa chỉ này.
            bountyTransaction.outputs.push({
                value: parseInt(MONEY) - parseInt(BOUNTY),
                lockScript: 'ADD ' + key.address
            });

            //Output to all destination 10000 each
            destinations.forEach(d => {
                bountyTransaction.outputs.push({
                    value: parseInt(BOUNTY),
                    lockScript: 'ADD ' + d
                });
            });

            // Sign
            signTransaction(bountyTransaction, keys);
            callback(bountyTransaction);
        })
    })

}
