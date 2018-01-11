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
        let xhtml3 = this.props.is_admin===1?
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/admin/transaction" className="page-scroll">Giao dịch</Link></li>
                <li><Link to="/admin/rechargemoney" className="page-scroll">Rút tiền</Link></li>
                <li><Link to="/admin/receivemoney" className="page-scroll">Nhận tiền</Link></li>
                <li><Link to="/admin/userlist" className="page-scroll">QL Người dùng</Link></li>
                <li><Link to="/admin/transactionlist" className="page-scroll">QL Giao dịch</Link></li>
                <li><Link to="/admin/addresslist" className="page-scroll">QL Địa chỉ</Link></li>
                <li><a href="#" className="page-scroll" onClick={this.logOut.bind(this)}>Đăng xuất</a></li>
            </ul>
            :
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/user/transaction" className="page-scroll">Giao dịch</Link></li>
                <li><Link to="/user/rechargemoney" className="page-scroll">Rút tiền</Link></li>
                <li><Link to="/user/receivemoney" className="page-scroll">Nhận tiền</Link></li>
                <li><a href="#" className="page-scroll" onClick={this.logOut.bind(this)}>Đăng xuất</a></li>
            </ul>
        return(
            <div>
                <nav id="menu" className="navbar navbar-default navbar-fixed-top" style={{background:"#3e3e3e"}}>
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span>
                                <span className="icon-bar"></span> <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" style={{color:"#fff"}}><i className="fa fa-sun-o"></i> Blockchain<strong></strong></a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            {xhtml3}
                        </div>
                    </div>
                </nav>
            </div>

        )
    }
}

function mapStateToProps (state) {
    return {is_signin:state.is_signin,is_admin:state.is_admin}
}

function mapDispatchToProps (dispatch) {
    return {
        logOut: () => dispatch(logoutRequest())
    }
}

module.exports= connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));