import React from 'react';
import {connect} from 'react-redux';
import SigninForm from './signin_form'
class SignIn extends React.Component{
    handleClickSignIn(){
        const walletId = this.refs.email;
        const password = this.refs.pass;

        this.props.signIn(walletId, password);
        this.props.history.push('/user/info')
    }
    render(){
        return(
            <div>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <SigninForm/>
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }
}

function mapStartToProps(state){
    return {
        email: state.email
    };
}

function mapDispatchToProps(dispatch){
    return {
        signIn: (walletId, password) => dispatch(signinRequest(walletId, password))
    };
}

export default connect(mapStartToProps, mapDispatchToProps)(SignIn);
