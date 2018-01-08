import React from 'react'
import {connect} from 'react-redux';
class SignupForm extends React.Component{
    handleClickSignUp(){
        var email = this.refs.email.value.trim();
        var password = this.refs.password.value.trim();
        var surplus = this.refs.surplus.value.trim();

        this.props.signUp(email, password, surplus);

        this.refs.email.value = '';
        this.refs.password.value = '';
    }
    render(){
        return (
            <div>
                <h1 className="text-center page-title">Tạo Ví Của Bạn</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email của bạn"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Mật khẩu</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Mật khẩu"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Nhập lại mật khẩu</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Nhập lại mật khẩu"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Tạo Ví</button>
                </form>
            </div>
        );
    }
}


module.exports= connect()(SignupForm);
