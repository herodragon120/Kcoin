import cst from '../../constants/constants'
import axios from 'axios'

function logoutRequest(wallet,pass) {
    return (dispatch)=>{
        return axios.get('/logout')
            .then(res=>{
                dispatch(logOut())
            })
            .catch(err=>{
                console.log(err)
            })
    }
}

function logOut() {
    return {type:cst.LOG_OUT}
}

module.exports = {logoutRequest}