const redux = require('redux');
const is_login=require("./is_login");

var reducer=redux.combineReducers({
    is_login
});

module.exports = reducer;