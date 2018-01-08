import cst from '../../../constants/constants'
import axios from 'axios'

function signupRequest(email,pass,confirmpassword) {
    return (dispatch)=>{
        return axios.post('/signup',{email:email.value,password:pass.value,confirmpassword:confirmpassword.value})
            .then(res=>{
                dispatch(signUp(res.data.message))
            })
            .catch(err=>{
                console.log(err)
            })
    }
}
function signUp(message) {
        return {type:cst.SIGN_UP,mess:message}
}

module.exports = {signupRequest}