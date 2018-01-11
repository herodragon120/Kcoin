import React from 'react'
import {connect} from 'react-redux';
import SignupForm from './signup_form'
class SignupPage extends React.Component{
    render(){
        return (
            <SignupForm/>
        );
    }
}
module.exports= connect()(SignupPage);
