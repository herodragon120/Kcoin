import cst from '../../constants/constants'

var transaction_list_info = (state = {}, action) => {
    switch(action.type){
        case cst.GET_TRANSACTION_LIST:
            return action.transaction_list_info;
        case cst.LOG_OUT:
            return {};
        default:
            return state;
    }
};

module.exports = transaction_list_info;