import React from 'react'
import {connect} from 'react-redux';
import {signinRequest} from '../../actions/user_pages/signin_page/signin_actions'
import {withRouter} from 'react-router'
import '../user_pages/user.css'
class SigninForm extends React.Component{
    handleSubmit(e){
        e.preventDefault();
        var {txt_wallet,txt_pass} = this.refs;
        this.props.signIn(txt_wallet,txt_pass)
            .then(res=>{
                if(this.props.is_signin && this.props.is_admin === 0)
                    this.props.history.push('/user/info')
                if(this.props.is_signin && this.props.is_admin === 1)
                    this.props.history.push('/admin/info')
            })
    }
    render(){
        var xhtml = this.props.err_mess
        return (
            <div>
                <h1 className="text-center page-title">ĐĂNG NHẬP</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Ví của bạn</label>
                        <input ref="txt_wallet" type="text" className="form-control"  placeholder="Ví của bạn"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Mật khẩu</label>
                        <input ref="txt_pass" type="password" className="form-control" id="exampleInputPassword1" placeholder="Mật khẩu"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1" ref="txt_err" className="err-mess">{xhtml}</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Đăng Nhập</button>

                </form>
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
