import axios from 'axios';
import cst from '../../../constants/constants';

function loginRequest(email,pass) {
    return (dispatch)=>{
        return axios.post('/login',{email:email.value,pass:pass.value})
            .then(res=>{
                if(res.data.mess === 'DANG_NHAP_THANH_CONG')
                    dispatch(logIn())
                else
                    alert('Tên đăng nhập hoặc mật khẩu không đúng!');
            })
            .catch(err => console.log(err))
    }
}
function logIn() {
    return {type:cst.LOG_IN}
}


module.exports = {loginRequest}