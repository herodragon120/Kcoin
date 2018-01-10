import cst from '../../constants/constants'

var address_list_info = (state = {}, action) => {
    switch(action.type){
        case cst.GET_ADDRESS_LIST:
            return action.address_list_info;
        case cst.LOG_OUT:
            return {};
        default:
            return state;
    }
};

module.exports = address_list_info;