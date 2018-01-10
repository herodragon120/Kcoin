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
            var pageCurrent=req.params.id;
            User.find({},'email kcoin_tt kcoin_kd',function (err,result) {
                if(err){
                    return res.send(err);
                }else{
                    if(result === null){
                        return res.send({message:null});
                    }else{
                        var pageTotal=Math.floor(result.length/2);
                        if(result.length % 2>0){
                            pageTotal++;
                        }
                        var mang=[];
                        for(var i=result.length-1;i>=0;i--){
                            mang.push(result[i]);
                        }
                        var mangresult=[];
                        for(var i=2*(pageCurrent-1);i<=2*pageCurrent-1;i++){
                            if(mang[i]!=null){
                                mangresult.push(mang[i]);
                            }
                        }
                        res.send({
                            user_list_info:{ list:mangresult, totalPage:pageTotal},
                            wallet:req.session.wallet,
                            is_admin:req.session.isAdmin
                        });
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
                        var pageCurrent=req.params.page;
                        var pageTotal=Math.floor(result.length/2);
                        if(result.length % 2>0){
                            pageTotal++;
                        }
                        var mang=[];
                        for(var i=result.length-1;i>=0;i--){
                            mang.push(result[i]);
                        }
                        var mangresult=[];
                        for(var i=2*(pageCurrent-1);i<=2*pageCurrent-1;i++){
                            if(mang[i]!=null){
                                mangresult.push(mang[i]);
                            }
                        }
                        res.send({
                            address_list_info:{ list:mangresult, totalPage:pageTotal},
                            wallet:req.session.wallet,
                            is_admin:req.session.isAdmin
                        });
                    }
                }
            })
        }
    }
}