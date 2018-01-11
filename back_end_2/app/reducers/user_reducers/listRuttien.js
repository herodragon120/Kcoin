import cst from '../../constants/constants'

var listRuttien = (state = [], action) => {
    switch(action.type){
        case cst.GET_INFO:
            return action.listRuttien;
        case cst.LOG_OUT:
            return [];
        default:
            return state;
    }
};

module.exports = listRuttien;