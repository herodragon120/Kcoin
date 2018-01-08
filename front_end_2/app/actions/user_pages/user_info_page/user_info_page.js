import cst from '../../../constants/constants'
import axios from 'axios'

function getInfoRequest() {
    return (dispatch)=>{
        return axios.get('/getinfo')
            .then(res=>{
                console.log(res)
                    dispatch(getInfo(res.data.kcoin_tt,res.data.kcoin_kd,res.data.user_transactions))
            })
            .catch(err=>{
                console.log(err)
            })
    }
}
function getInfo(kcointt,kcoinkd,usertransactions) {
    return {type:cst.GET_INFO,kcointt,kcoinkd,usertransactions}
}

module.exports = {getInfoRequest}