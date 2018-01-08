import cst from '../constants/constants'

var is_signin = (state = false, action) => {
    switch(action.type){
        case cst.SIGN_IN:
            return action.is_signin;
        case cst.LOG_OUT:
            return false;
        default:
            return state;
    }
};

module.exports = is_signin;