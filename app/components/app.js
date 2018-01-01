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
import Footer from './Footer/Footer'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter >
                <div>
                    <Nav/>
                    {this.props.children}
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/account" component={Account}/>
                    <Route path="/transaction" component={Transaction}/>
                    <Route path="/account/signup" component={SignUp}/>
                    <Footer/>
                </div>

            </BrowserRouter >
        );
    }
}
module.exports = App;