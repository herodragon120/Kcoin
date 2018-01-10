
var block = require('../models/Block');

/*Get Block from BlockChain API KCoin*/
exports.listblock=function (req,res) {
    block.find({},'hash nonce version timestamp difficulty transactions',function (err,result) {
        if(err){
            res.send({message:err});
        }else{
            if(result===null)
            {
                res.send({message:'NULL'});
            }else{
                var mang=[];
                for(var i=result.length-1;i>=result.length-10;i--)
                {
                    console.log(result[i].timestamp);
                    mang.push({
                        hash:result[i].hash,
                        nonce:result[i].nonce,
                        version:result[i].version,
                        difficulty:result[i].difficulty,
                        timestamp:result[i].timestamp,
                        transactions:result[i].transactions.length,
                    });
                }
                var is_admin = req.session.is_admin == null ? 0 : req.session.is_admin
                res.send({block:mang,wallet:req.session.wallet,is_admin:is_admin});
            }
        }
    })
}


