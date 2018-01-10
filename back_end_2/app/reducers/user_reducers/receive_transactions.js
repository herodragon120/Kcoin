import cst from '../../constants/constants'

var receive_transactions = (state = [], action) => {
    switch(action.type){
        case cst.GET_INFO:
            return action.receive_transactions;
        case cst.LOG_OUT:
            return [];
        default:
            return state;
    }
};

module.exports = receive_transactions;