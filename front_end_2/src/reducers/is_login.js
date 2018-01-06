import cst from '../constants/constants'

var is_login = (state = false, action) => {
    switch(action.type){
        case cst.LOG_IN:{
            return !state;
        }
        default:
            return state;
    }
};

module.exports = is_login;