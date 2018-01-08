import React from 'react';
import {connect} from 'react-redux';
import SigninForm from './signin_form'
class SignIn extends React.Component{
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

export default connect()(SignIn);
