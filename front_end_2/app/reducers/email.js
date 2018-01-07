import cst from '../constants/constants'

var email = (state = null, action) => {
    switch(action.type){
        case cst.SIGN_IN:{
            return action.email;
        }
        default:
            return state;
    }
};

module.exports = email;