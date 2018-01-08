import cst from '../constants/constants'

var wallet = (state = null, action) => {
    switch(action.type){
        case cst.SIGN_IN:
            return action.wallet;
        case cst.LOG_OUT:
            return null;
        default:
            return state;
    }
};

module.exports = wallet;