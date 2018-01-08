var redux = require('redux');
var is_signin = require('./is_signin');
var wallet = require('./wallet');
var kcoin_tt = require('./kcoin_tt');
var kcoin_kd = require('./kcoin_kd');
var user_transactions = require('./user_transactions');

const reducer = redux.combineReducers({
    is_signin,wallet,kcoin_tt,kcoin_kd,user_transactions
});

module.exports = reducer;