import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class SignIn extends React.Component{
  handleSubmit(e){
    e.preventDefault();
    var {dispatch}=this.props;
    var {username,password}=this.refs;
  }
  render(){
    return (
      <div>
          <h1 className="text-center page-title">Sign In</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="row">
            <div className="col-md-4 page-signin">
              <div className="form-group">
                <label>ID Wallet</label>
                <input type="text" placeholder="Username" ref="username"/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Password" ref="password"/>
              </div>
              <button type="submit" className="button btSignIn">Sign In</button>
              &nbsp; or <Link to="/account/signup" >Sign Up</Link> to use Kcoin
            </div>
          </div>
        </form>

      </div>
    )
  }
}

module.exports = connect()(SignIn);
{/*
<form onSubmit={this.handleSubmit.bind(this)}>
  <input type="text" placeholder="Username" ref="username"/>
  <br/>
  <input type="password" placeholder="Password" ref="password"/>
  <br/>
  <button type="submit" className="button">Sign In</button>
</form>*/}
