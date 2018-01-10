import cst from '../../constants/constants'

var num_user = (state = 0, action) => {
    switch(action.type){
        case cst.GET_INFO:
            return action.num_user;
        case cst.LOG_OUT:
            return 0;
        default:
            return state;
    }
};

module.exports = num_user;