User = require('../models/User');


// quyền admin

exports.listuser=function (req,res) {
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
                        return res.json(result);
                    }
                }
            })
        }
    }
}

exports.statistical=function (req,res) {
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
}
exports.listaddress=function (req,res) {
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
}