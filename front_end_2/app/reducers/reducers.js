const redux = require('redux');
const is_signin = require('./is_signin');
const email = require('./email');

const reducer = redux.combineReducers({
    is_signin,email
});

module.exports = reducer;