import cst from '../../constants/constants'

var is_admin = (state = 0, action) => {
    switch(action.type){
        case cst.SIGN_IN:
            return action.is_admin;
        case cst.LOG_OUT:
            return 0;
        default:
            return state;
    }
};

module.exports = is_admin;