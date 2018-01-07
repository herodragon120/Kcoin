import React from 'react'
import {connect} from 'react-redux';
import {getInfoRequest} from '../../../actions/index'
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
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email của bạn"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Mật khẩu</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Mật khẩu"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Nhập lại mật khẩu</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Nhập lại mật khẩu"/>
                    </div>
                    <button type="submit" class="btn btn-primary">Tạo Ví</button>
                </form>
            </div>
        );
    }
}


function mapStateToProps (state) {
    return {email:state.email}
}

function mapDispatchToProps (dispatch) {
    return {
        getInfo: () => dispatch(getInfoRequest())
    }
}

module.exports= connect(mapStateToProps, mapDispatchToProps)(SignupForm);
