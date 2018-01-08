import cst from '../../constants/constants'

var user_transactions = (state = null, action) => {
    switch(action.type){
        case cst.GET_INFO:
            return action.usertransactions;
        case cst.LOG_OUT:
            return null;
        default:
            return state;
    }
};

module.exports = user_transactions;