import cst from '../constants/constants'
import axios from 'axios'


function signinRequest(email,pass) {
    return (dispatch)=>{
        return axios.post('/signin',{email: email.value,pass: pass.value})
            .then(res=>{
                if(res.data.mess == 'DANG_NHAP_THANH_CONG'){
                    dispatch(signIn(email.value));
                    alert('Tên đăng nhập thnh cong!');
                }else{
                    alert('Tên đăng nhập hoặc mật khẩu không đúng!');
                }
            })
    }
}

function getInfoRequest() {
    return (dispatch)=>{
        return axios.get('/getinfo')
            .then(res => {
                if(res.data != 'CHUA_DANG_NHAP'){
                    console.log(res)
                    dispatch(signIn(res.data.email));
                }
            })
            .catch(error => console.log('khong lay dc thong tin'))
    }
}
function signIn(email) {
    return {type:cst.SIGN_IN,email}
}

module.exports = {
    signinRequest,getInfoRequest
}