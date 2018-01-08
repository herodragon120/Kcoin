import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import {withRouter} from 'react-router';
import {logoutRequest} from '../../actions/user_pages/logout'
import './nav.css'
class Nav extends React.Component{
    logOut(){
        this.props.logOut()
        this.props.history.push('/')
    }
    render(){
        var xhtml = this.props.is_signin?
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={this.logOut.bind(this)}><span className="glyphicon glyphicon-log-out"></span> Đăng Xuất</a></li>
            </ul>
            :
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/user/signup"><span className="glyphicon glyphicon-user"></span> Đăng Ký</Link></li>
                <li><Link to="/user/signin"><span className="glyphicon glyphicon-log-in"></span> Đăng Nhập</Link></li>
            </ul>
        var xhtml2 = this.props.is_signin?
            <li><Link to="/user/info">Quản lý tài khoản</Link></li>
            :null
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">KBLOCKCHAIN</Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Trang Chủ</Link></li>
                        <li><Link to="/">Thông Tin</Link></li>
                        {xhtml2}
                    </ul>
                    {xhtml}
                </div>
            </nav>
        )
    }
}

function mapStateToProps (state) {
    return {is_signin:state.is_signin}
}

function mapDispatchToProps (dispatch) {
    return {
        logOut: () => dispatch(logoutRequest())
    }
}

module.exports= connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));