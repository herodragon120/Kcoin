import React from 'react';
import {Link, NavLink} from 'react-router-dom';

class Nav extends React.Component{
  render(){
    return (
        <div className="top-bar">
            <div className="top-bar-left">
                <ul className="dropdown menu" data-dropdown-menu>
                    <li className="menu-text">Sàn Giao Dịch Kcoin</li>
                    <NavLink  exact to="/" >Home</NavLink>
                    <li>
                        <NavLink  to="/account">Wallet</NavLink>
                        <ul className="menu vertical">
                            <li><Link  to="/account" >Thông tin người dùng</Link></li>
                            <li><Link  to="/account" >Thông tin giao dịch</Link></li>
                            <li><Link  to="/account" >Các thông tin khác</Link></li>
                        </ul>
                    </li>
                    <li>
                        <NavLink  to="/transaction">BlockChain</NavLink>
                        <ul className="menu vertical">
                            <li><Link  to="/transaction" >Transaction</Link></li>
                            <li><Link  to="/transaction" >Block</Link></li>
                            <li><Link  to="/transaction" >Các thông tin khác</Link></li>
                        </ul>
                    </li>

                </ul>
            </div>
            <div className="top-bar-right">
                <ul className="menu">
                    <li><input type="text" className="search-bar" placeholder=""/></li>
                    <li><button type="button" className="buttonWallet">Search</button></li>
                </ul>
            </div>
        </div>
    )
  }
}
module.exports = Nav;
