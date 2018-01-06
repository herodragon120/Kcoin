import React from 'react';
import {connect} from 'react-redux';
import SignIn from './signin_page/signin';
import AccountInfo from 'src/components/user_pages/user_info_page/account_info';
import Nav from './nav'
class Account extends React.Component{
    render(){
        return (
            <div>
                {this.props.isLogin ?<AccountInfo/>:<SignIn/>}
            </div>
        )
    }
}

module.exports = connect(function (state){
    return {isLogin: state.isLogin};
})(Account);