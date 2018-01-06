import React from 'react';
import {Link, NavLink} from 'react-router-dom';

class Nav extends React.Component{
    render(){
        return (
            <div className="top-bar">
                <div className="top-bar-left">
                    <ul className="dropdown menu" data-dropdown-menu>
                        <li className="menu-text">Sàn Giao Dịch Kcoin</li>
                    </ul>
                </div>
                <div className="top-bar-right">
                    <ul className="menu">
                        <li><input type="text" className="search-bar" placeholder=""/></li>
                        <li>
                            <NavLink  exact to="/" >Đăng xuất</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
module.exports = Nav;
