import cst from '../constants/index'

var isLogin = (state = false, action) => {
    switch(action.type){
        case cst.TOGGLE_LOGIN:{
            return !state;
        }
        default:
            return state;
    }
};

module.exports = isLogin;