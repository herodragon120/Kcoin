import cst from '../constants/constants'

var kcoin_tt = (state = null, action) => {
    switch(action.type){
        case cst.GET_INFO:
            return action.kcointt;
        case cst.LOG_OUT:
            return null;
        default:
            return state;
    }
};

module.exports = kcoin_tt;