import cst from '../constants/constants';

function toggleIsLogin(){
    return {
        type: cst.LOG_IN
    }
}

module.exports = {
    toggleIsLogin,
};