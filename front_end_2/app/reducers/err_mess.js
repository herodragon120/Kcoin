import cst from '../constants/constants'

var err_mess = (state = "", action) => {
    switch(action.type){
        case cst.SIGN_IN:{
            if(action.mess=="CHUA_XAC_THUC"){
                return "Tài khoản đã được đăng ký,vui lòng xác thực email !"
            }
            if(action.mess=="TAI_KHOAN_KHONG_DUNG") {
                return "Thông tin tài khoản không chính xác !"
            }
            return ""
        }
        case cst.SIGN_UP:{
            if(action.mess=="DANG_KY_THANH_CONG")
                return "Đăng ký thành công, vui lòng xác thực email!"
            if(action.mess=="EMAIL_DA_SU_DUNG")
                return "Email đã tồn tại!"
            if(action.mess=="CHUA_NHAP_THONG_TIN")
                return "Thông tin không được để trống!"
            if(action.mess=="MAT_KHAU_KHONG_DUNG")
                return "Thông tin không chính xác!"
            return ""
        }
        default:
            return state;
    }
};

module.exports = err_mess;