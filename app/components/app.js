import React from 'react';
import {
    BrowserRouter ,
    Route,
    NavLink,
    Link,
    Redirect
} from 'react-router-dom';
import HomePage from 'HomePage';
import Nav from 'Nav';
import Account from 'Account';
import SignUp from 'SignUp';
import Transaction from 'Transaction';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter >
                <div>
                    <div className="top-bar">
                        <div className="top-bar-left">
                            <ul className="dropdown menu" data-dropdown-menu>
                                <li className="menu-text">Sàn Giao Dịch Kcoin</li>
                                <li><NavLink  exact to="/" activeClassname="active">Homepage</NavLink></li>
                                <li>
                                    <li><NavLink  to="/account" activeClassname="active">Wallet</NavLink></li>
                                    <ul className="menu vertical">
                                        <li><NavLink  to="/account" activeClassname="active">Thông tin người dùng</NavLink></li>
                                        <li><NavLink  to="/account" activeClassname="active">Thông tin giao dịch</NavLink></li>
                                        <li><NavLink  to="/account" activeClassname="active">Các thông tin khác</NavLink></li>
                                    </ul>
                                </li>
                                <li>
                                    <li><NavLink  to="/transaction" activeClassname="active">BlockChain</NavLink></li>
                                    <ul className="menu vertical">
                                        <li><NavLink  to="/transaction" activeClassname="active">Transaction</NavLink></li>
                                        <li><NavLink  to="/transaction" activeClassname="active">Block</NavLink></li>
                                        <li><NavLink  to="/transaction" activeClassname="active">Các thông tin khác</NavLink></li>
                                    </ul>
                                </li>

                            </ul>
                        </div>
                        <div className="top-bar-right">
                            <ul className="menu">
                                <li><input type="search" placeholder=""/></li>
                                <li><button type="button" className="button">Search</button></li>
                            </ul>
                        </div>
                    </div>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/account" component={Account}/>
                    <Route path="/transaction" component={Transaction}/>
                    <Route path="/account/signup" component={SignUp}/>
                </div>
            </BrowserRouter >
        );
    }
}
module.exports = App;