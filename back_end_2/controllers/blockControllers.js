
var block = require('../models/Block');

/*Get Block from BlockChain API KCoin*/
exports.listblock=function (req,res) {
    block.find({},'hash nonce version difficulty timestamp',function (err,result) {
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
                    mang.push(result[i]);
                }
                res.json(mang);
            }
        }
    })
}


