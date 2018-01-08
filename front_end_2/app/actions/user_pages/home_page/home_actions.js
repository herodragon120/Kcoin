import cst from '../../../constants/constants'
import {signIn} from '../signin_page/signin_actions'
import axios from 'axios'

function getBlockRequest() {
    return (dispatch)=>{
        return axios.get('/getblock')
            .then(res=>{
                dispatch(setBlockState(res.data.block))
                console.log(res.data)
                if(res.data.wallet!=null)
                    dispatch(signIn(res.data.wallet,"DANG_NHAP_THANH_CONG"))
            })
            .catch(err=>{
                console.log(err)
            })
    }
}
function setBlockState(block) {
    return {type:cst.SET_BLOCK,block}
}

module.exports = {getBlockRequest}