import React from 'react';
import {Link, NavLink} from 'react-router-dom';

class Nav extends React.Component{
  render(){
    return (
        <div className="top-bar">
            <div className="top-bar-left">
                <ul className="dropdown menu" data-dropdown-menu>
                    <li className="menu-text">Sàn Giao Dịch Kcoin</li>
                    <li>
                        <ul className="menu vertical">
                        </ul>
                    </li>
                    <li><NavLink  exact to="/" activeClassName="active">Homepage</NavLink></li>
                    <li><NavLink  to="/account" activeClassName="active">Account</NavLink></li>
                    <li><NavLink  to="/transaction" activeClassName="active">Transaction</NavLink></li>
                </ul>
            </div>
            <div className="top-bar-right">
                <ul className="menu">
                    <li><input type="search" placeholder="Search"/></li>
                    <li><button type="button" className="button">Search</button></li>
                </ul>
            </div>
        </div>
    )
  }
}
module.exports = Nav;
