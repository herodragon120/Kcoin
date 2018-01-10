import cst from '../../constants/constants'

var user_address = (state = null, action) => {
    switch(action.type){
        case cst.GET_INFO:
            return action.user_address;
        case cst.LOG_OUT:
            return null;
        default:
            return state;
    }
};

module.exports = user_address;