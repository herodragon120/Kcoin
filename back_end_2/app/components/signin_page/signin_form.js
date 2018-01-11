import React from 'react'
import {connect} from 'react-redux';
import {signinRequest} from '../../actions/user_pages/signin_page/signin_actions'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import '../user_pages/user.css'
class SigninForm extends React.Component{
    handleSubmit(e){
        e.preventDefault();
        var {txt_wallet,txt_pass} = this.refs;
        this.props.signIn(txt_wallet,txt_pass)
            .then(res=>{
                if(this.props.is_signin && this.props.is_admin === 0)
                    this.props.history.push('/user/transaction')
                if(this.props.is_signin && this.props.is_admin === 1)
                    this.props.history.push('/admin/transaction')
            })
    }
    render(){
        var xhtml = this.props.err_mess !== ""?
            <div className="form-group">
                <label htmlFor="exampleInputPassword1" ref="txt_err" className="err-mess">{this.props.err_mess}</label>
            </div>
            :""

        return (
            <div className="top-content">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2 text" style={{marginTop:"30px"}}>
                            <h1><strong>Blockchain</strong> Đăng nhập</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3 form-box">
                            <div className="form-top">
                                <div className="form-top-left">
                                    <h3>Đăng nhập vào hệ thống</h3>
                                    <p>Vui lòng nhập đúng Ví và Mật khẩu của ban:</p>
                                </div>
                                <div className="form-top-right">
                                    <i className="fa fa-lock"></i>
                                </div>
                            </div>
                            <div className="form-bottom">
                                <form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="form-username">Username</label>
                                        <input ref="txt_wallet" type="text" name="form-username" placeholder="Ví của bạn..." className="form-username form-control" id="form-username"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="form-password">Password</label>
                                        <input ref="txt_pass" type="password" name="form-password" placeholder="Mật khẩu..." className="form-password form-control" id="form-password"/>
                                    </div>
                                    {xhtml}
                                    <button type="submit" className="btn">Đăng nhập!</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3 ">
                            <h3 style={{color:"#d4b9b9"}}>...hoặc tạo tài khoản:<Link className="btn btn-link-2" to="/signup" style={{border:"0px",background:"#0000"}}>
                                <i className="fa fa-github-square" ></i> Đăng ký
                            </Link></h3>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


function mapStateToProps (state) {
    return {is_signin:state.is_signin,err_mess:state.err_mess,is_admin:state.is_admin}
}

function mapDispatchToProps (dispatch) {
    return {
        signIn: (wallet,pass) => dispatch(signinRequest(wallet,pass))
    }
}

module.exports= connect(mapStateToProps, mapDispatchToProps)(withRouter(SigninForm));
