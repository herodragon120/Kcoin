import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

class Nav extends React.Component{
    render(){
        var {is_login} = this.props;
        var xhtml = is_login === true? null
            :<div className="top-bar-left">
                <ul className="dropdown menu" data-dropdown-menu>
                    <NavLink  exact to="/" className="menu-text">K BLOCKCHAIN</NavLink>
                    <li>
                        <NavLink  to="/user/signin">TÀI KHOẢN</NavLink>
                        <ul className="menu vertical">
                            <li><Link  to="/user/signin" >Đăng Nhập</Link></li>
                            <li><Link  to="/user/signin" >Đăng Ký</Link></li>
                        </ul>
                    </li>
                    <li>
                        <NavLink  to="/transaction">THÔNG TIN</NavLink>
                        <ul className="menu vertical">
                            <li><Link  to="/transaction" >Team</Link></li>
                            <li><Link  to="/transaction" >Block</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        return (
            <div className="top-bar">
                {xhtml}
            </div>
        )
    }
}
module.exports = connect(function (state) {
    return {is_login:state.is_login}
})(Nav);