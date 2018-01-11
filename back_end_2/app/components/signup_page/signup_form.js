import React from 'react'
import {connect} from 'react-redux'
import {signupRequest} from '../../actions/user_pages/signup_page/signup_actions'
import {Link} from 'react-router-dom'
import '../user_pages/user.css'
class SignupForm extends React.Component{
    handleSubmit(e){
        e.preventDefault();
        var {txt_email,txt_pass,txt_confirmpass} = this.refs
        this.props.signUp(txt_email,txt_pass,txt_confirmpass)
    }
    render(){
        var xcss = this.props.err_mess.indexOf("thành công")!=-1?"suc-mess":"err-mess"
        var xhtml = this.props.err_mess !== ""?
            <div className="form-group">
                <label htmlFor="exampleInputPassword1" className={xcss}>{this.props.err_mess}</label>
            </div>
            :""
        return (
            <div className="top-content">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2 text" style={{marginTop:"30px"}}>
                            <h1><strong>Blockchain</strong> Đăng ký</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3 form-box">
                            <div className="form-top">
                                <div className="form-top-left">
                                    <h3>Đăng ký tài khoản hệ thống</h3>
                                    <p>Vui lòng nhập đúng Email và Mật khẩu của ban:</p>
                                </div>
                                <div className="form-top-right">
                                    <i className="fa fa-lock"></i>
                                </div>
                            </div>
                            <div className="form-bottom">
                                <form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="form-username">Username</label>
                                        <input ref="txt_email"  type="text" name="form-username" placeholder="Email của bạn..." className="form-username form-control" id="form-username"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="form-password">Password</label>
                                        <input ref="txt_pass" type="password" name="form-password" placeholder="Mật khẩu..." className="form-password form-control" id="form-password"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="form-password">Password</label>
                                        <input ref="txt_confirmpass" type="password" name="form-password2" placeholder="Nhập lại mật khẩu..." className="form-password form-control" id="form-password2"/>
                                    </div>
                                    {xhtml}
                                    <button type="submit" className="btn">Đăng ký!</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                            <h3 style={{color:"#d4b9b9"}}>...bạn đã có tài khoản:<Link className="btn btn-link-2" to="/" style={{border:"0px",background:"#0000"}}>
                                <i className="fa fa-github-square" ></i> Đăng nhập
                            </Link></h3>
                        </div>
                    </div>
                </div>

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
