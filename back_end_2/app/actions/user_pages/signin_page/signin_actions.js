import cst from '../../../constants/constants'
import axios from 'axios'

function signinRequest(wallet,pass) {
    return (dispatch)=>{
        return axios.post('/account/signin',{wallet:wallet.value,password:pass.value})
            .then(res=>{
                dispatch(signIn(res.data.wallet,res.data.message,res.data.is_admin))
            })
            .catch(err=>{
                console.log(err)
            })
    }
}
function signIn(wallet,mess,is_admin) {
    if(mess == 'DANG_NHAP_THANH_CONG')
        return {type:cst.SIGN_IN,is_signin:true,wallet,mess,is_admin}
    else{
        return {type:cst.SIGN_IN,is_signin:false,wallet,mess,is_admin}
    }
}
function guiTienRequest(address,money) {
    return (dispatch)=>{
        return axios.post('/rutTien',{address:address.value,money:money.value})
            .then(res=>{
                dispatch(guiTien(res.data.message))
            })
            .catch(err=>{
                console.log(err)
            })
    }
}
function guiTien(mess) {
    return {type:cst.GUI_TIEN,mess}
}

module.exports = {signinRequest,signIn,guiTienRequest}