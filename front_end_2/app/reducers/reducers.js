var redux = require('redux');
var is_signin = require('./user_reducers/is_signin');
var wallet = require('./user_reducers/wallet');
var kcoin_tt = require('./user_reducers/kcoin_tt');
var kcoin_kd = require('./user_reducers/kcoin_kd');
var block = require('./block');
var err_mess = require('./err_mess');
var user_transactions = require('./user_reducers/user_transactions');
var detail_block = require('./detail_block')

const reducer = redux.combineReducers({
    is_signin, wallet, kcoin_tt, kcoin_kd,
    user_transactions, block, err_mess,
    detail_block
});

module.exports = reducer;