import cst from '../constants/constants'

var kcoin_kd = (state = null, action) => {
    switch(action.type){
        case cst.GET_INFO:
            return action.kcoinkd;
        default:
            return state;
    }
};

module.exports = kcoin_kd;