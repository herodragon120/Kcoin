import cst from '../constants/constants'

var is_signin = (state = [], action) => {
    switch(action.type){
        case cst.SET_BLOCK:
            return action.block;
        default:
            return state;
    }
};

module.exports = is_signin;