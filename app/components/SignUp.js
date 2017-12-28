import React from 'react';
import {connect} from 'react-redux';
class SignUp extends React.Component{
    handleSubmit(e){

    }
    render(){
        return (
            <div>
                <h1 className="text-center page-title">Sign Up</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                        <div className="col-md-4 page-signin">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" placeholder="Email" ref="Email"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" placeholder="Password" ref="password"/>
                            </div>
                            <button type="submit" className="button btSignIn">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

module.exports = connect()(SignUp);
