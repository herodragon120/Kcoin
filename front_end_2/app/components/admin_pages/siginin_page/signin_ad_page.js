import React from 'react';
import {connect} from 'react-redux';
import SigninAdForm from './signin_ad_form'
class SignInAd extends React.Component{
    render(){
        return(
            <div>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <SigninAdForm/>
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }
}

export default connect()(SignInAd);
