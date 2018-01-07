import React from 'react'
import {Link, NavLink} from 'react-router-dom';
class Nav extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">KBLOCKCHAIN</Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Trang Chủ</Link></li>
                        <li><Link to="/">Thông Tin</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/user/signup"><span className="glyphicon glyphicon-user"></span> Đăng Ký</Link></li>
                        <li><Link to="/user/signin"><span className="glyphicon glyphicon-log-in"></span> Đăng Nhập</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

module.exports = Nav;