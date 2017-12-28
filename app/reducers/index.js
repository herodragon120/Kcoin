const redux = require('redux');
const isLogin=require("./isLogin");

var reducer=redux.combineReducers({
    isLogin
});

module.exports = reducer;