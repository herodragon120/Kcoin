import cst from '../constants/constants'

var detail_block = (state = null, action) => {
    switch(action.type){
        case cst.DETAIL_BLOCK:
            return action.detail;
        default:
            return state;
    }
};

module.exports = detail_block;