import cst from '../../constants/constants'

var user_list_info = (state = {}, action) => {
    switch(action.type){
        case cst.GET_USER_LIST:
            return action.user_list_info;
        case cst.LOG_OUT:
            return {};
        default:
            return state;
    }
};

module.exports = user_list_info;