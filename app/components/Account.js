import React from 'react';
import {connect} from 'react-redux';
import {
    toggleIsLogin
}from '../actions/index'
import SignIn from 'SignIn';
import AccountInfo from 'AccountInfo';

class Account extends React.Component{
    render(){
        /*var {dispatch} = this.props;
        dispatch(toggleIsLogin());*/
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