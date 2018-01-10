import React from 'react'
import {connect} from 'react-redux'
import {signupRequest} from '../../actions/user_pages/signup_page/signup_actions'
import '../user_pages/user.css'
class SignupForm extends React.Component{
    handleSubmit(e){
        e.preventDefault();
        var {txt_email,txt_pass,txt_confirmpass} = this.refs
        this.props.signUp(txt_email,txt_pass,txt_confirmpass)
    }
    render(){
        var xcss = this.props.err_mess.indexOf("thành công")!=-1?"suc-mess":"err-mess"
        var xhtml = this.props.err_mess
        return (
            <div>
                <h1 className="text-center page-title">Tạo Ví Của Bạn</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input ref="txt_email" type="email" className="form-control" id="exampleInputEmail1" placeholder="Email của bạn"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Mật khẩu</label>
                        <input ref="txt_pass" type="password" className="form-control" id="exampleInputPassword1" placeholder="Mật khẩu"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Nhập lại mật khẩu</label>
                        <input ref="txt_confirmpass" type="password" className="form-control" id="exampleInputPassword1" placeholder="Nhập lại mật khẩu"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className={xcss}>{xhtml}</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Tạo Ví</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {err_mess:state.err_mess}
}

function mapDispatchToProps (dispatch) {
    return {
        signUp: (wallet,pass,confirmpassword) => dispatch(signupRequest(wallet,pass,confirmpassword))
    }
}

module.exports= connect(mapStateToProps, mapDispatchToProps)(SignupForm);
