import React from 'react';
import  {Link} from 'react-router-dom'
import {connect} from 'react-redux';
class SignUp extends React.Component{
    handleSubmit(e){

    }
    render(){
        return (
            <div>
                <div className="col-md-4 page-signin">
                    <header className="header-1">
                        <hgroup>
                            <div className="page-title">
                                Tạo Ví Của Bạn
                                <span className="f-17">hoặc <Link exact to="/user/signin">Đăng nhập</Link></span>
                            </div>

                            <p>Đăng ký ví miễn phí bên dưới</p>
                        </hgroup>
                    </header>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text"  ref="email"/>
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu mới</label>
                                <input type="password" ref="password"/>
                            </div>
                            <div className="form-group">
                                <label>Xác nhận Mật khẩu </label>
                                <input type="password" ref="passwordconfim"/>
                            </div>
                            <button type="submit" className="button btSignIn">Đăng ký</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
module.exports = connect()(SignUp);
