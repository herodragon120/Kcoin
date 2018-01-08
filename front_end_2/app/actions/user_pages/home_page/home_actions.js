import cst from '../../../constants/constants'
import {signIn} from '../signin_page/signin_actions'
import axios from 'axios'

function getNewBlockRequest() {
    return (dispatch)=>{
        return axios.get('/getnewblock')
            .then(res=>{
                console.log(res)
                dispatch(setBlockState(res.data.block))
            })
            .catch(err=>{
                console.log(err)
            })
    }
}
function getAllBlockRequest() {
    return (dispatch)=>{
        return axios.get('/getallblock')
            .then(res=>{
                console.log(res)
                dispatch(setBlockState(res.data.block))
            })
            .catch(err=>{
                console.log(err)
            })
    }
}
function setBlockState(block) {
    return {type:cst.SET_BLOCK,block}
}

module.exports = {getNewBlockRequest,getAllBlockRequest}