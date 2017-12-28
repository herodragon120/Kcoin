import cst from '../constants/index';

function toggleIsLogin(){
    return {
        type: cst.TOGGLE_LOGIN
    }
}

module.exports = {
    toggleIsLogin,
};