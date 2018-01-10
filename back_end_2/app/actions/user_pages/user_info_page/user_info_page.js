import cst from '../../../constants/constants'
import {signIn} from '../signin_page/signin_actions'
import axios from 'axios'

function getInfoRequest() {
    return (dispatch)=>{
        return axios.get('/account/getinfo')
            .then(res=>{
                dispatch(getInfo(res.data.kcoin_tt,res.data.kcoin_kd,res.data.listNaptien,res.data.user_address,res.data.is_admin))
                dispatch(signIn(res.data.wallet,"DANG_NHAP_THANH_CONG",res.data.is_admin))
            })
            .catch(err=>{
                console.log(err)
            })
    }
}
function getInfo(kcointt,kcoinkd,receive_transactions,user_address,is_admin) {
    return {type:cst.GET_INFO,kcointt,kcoinkd,receive_transactions,user_address,is_admin}
}

module.exports = {getInfoRequest}