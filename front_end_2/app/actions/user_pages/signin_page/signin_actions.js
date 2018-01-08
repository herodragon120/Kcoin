import cst from '../../../constants/constants'
import axios from 'axios'

function signinRequest(wallet,pass) {
    return (dispatch)=>{
        return axios.post('/signin',{wallet:wallet.value,password:pass.value})
            .then(res=>{
                dispatch(signIn(res.data.wallet,res.data.message))
            })
            .catch(err=>{
                console.log(err)
            })
    }
}
function signIn(wallet,mess) {
    if(mess == 'DANG_NHAP_THANH_CONG')
        return {type:cst.SIGN_IN,is_signin:true,wallet,mess}
    else{
        return {type:cst.SIGN_IN,is_signin:false,wallet,mess}
    }
}

module.exports = {signinRequest,signIn}