import React from 'react'
import {connect} from 'react-redux';
import SignupForm from './signup_form'
class SignupPage extends React.Component{
    render(){
        return (
            <div>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <SignupForm/>
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }
}
module.exports= connect()(SignupPage);
