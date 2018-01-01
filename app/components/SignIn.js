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
      <div className="row">
        <div className="col-md-4 page-signin">
        <header className="header-1">
          <hgroup>
            <div className="page-title">
              Chào Mừng Trở Lại
              <span className="f-17">hoặc <Link to="/account/signup">Đăng ký</Link></span>
            </div>

            <p>Đăng nhập vào ví của bạn bên dưới</p>
          </hgroup>
        </header>
        <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
              <div className="form-group">
                <label>ID Ví</label>
                <input type="text"  ref="username"/>
              </div>
              <div className="form-group">
                <label>Mật khẩu</label>
                <input type="password" ref="password"/>
              </div>
              <button type="submit" className="button btSignIn">Đăng nhập</button>
          </div>
        </form>
      </div>
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
