var redux = require('redux');
var is_signin = require('./user_reducers/is_signin');
var is_admin = require('./user_reducers/is_admin');
var wallet = require('./user_reducers/wallet');
var kcoin_tt = require('./user_reducers/kcoin_tt');
var kcoin_kd = require('./user_reducers/kcoin_kd');
var user_address = require('./user_reducers/user_address');
var block = require('./block');
var err_mess = require('./err_mess');
var receive_transactions = require('./user_reducers/receive_transactions');
var detail_block = require('./detail_block')
var transaction_list_info = require('./admin_reduces/transaction_list_info')
var user_list_info = require('./admin_reduces/user_list_info')
var address_list_info = require('./admin_reduces/address_list_info')

const reducer = redux.combineReducers({
    is_signin, wallet, kcoin_tt, kcoin_kd,
    receive_transactions, block, err_mess,
    detail_block,user_address,is_admin,transaction_list_info,
    user_list_info,address_list_info
});

module.exports = reducer;