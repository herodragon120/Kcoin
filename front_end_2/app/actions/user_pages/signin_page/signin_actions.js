import cst from '../../../constants/constants'
import axios from 'axios'

function signinRequest(wallet,pass) {
    return (dispatch)=>{
        return axios.post('/signin',{wallet:wallet.value,pass:pass.value})
            .then(res=>{
                if(res.data.mess == 'DANG_NHAP_THANH_CONG')
                    dispatch(signIn(res.data.wallet))
                else{
                    alert('Thông tin không đúng')
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }
}

function signIn(wallet) {
    return {type:cst.SIGN_IN,is_signin:true,wallet}
}

module.exports = {signinRequest,signIn}