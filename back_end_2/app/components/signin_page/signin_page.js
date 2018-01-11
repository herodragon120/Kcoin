import React from 'react';
import {connect} from 'react-redux';
import SigninForm from './signin_form'
class SignIn extends React.Component{
    render(){
        return(
            <SigninForm/>
        );
    }
}

export default connect()(SignIn);
