import React from 'react';
import {
    BrowserRouter ,
    Route,
    NavLink,
    Link,
    Redirect
} from 'react-router-dom';
import HomePage from './home_page/home_page';
import Nav from './navbar/nav';
import SignIn from './user_pages/signin_page/signin'
import SignUp from './user_pages/signup_page/signup';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter >
                <div>
                    <Nav/>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/user/signin" component={SignIn}/>
                    <Route exact path="/user/signup" component={SignUp}/>
                </div>
            </BrowserRouter >
        );
    }
}
module.exports = App;