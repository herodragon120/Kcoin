import React from 'react';
import {HashRouter , Route, Redirect} from 'react-router-dom';
import Home from './home_page/index';
import SignIn from './signin_page/signin_page';
import SignUp from './signup_page/signup_page';
import Nav from './navbar/nav';
import UserInfo from './user_pages/user_page'
import {connect} from 'react-redux';



class App extends React.Component {
    render() {
        return (
            <HashRouter >
                <div>
                    <Route exact path="/" component={SignIn}/>
                    <Route exact path="/signup" component={SignUp}/>

                    <Route exact path="/user/transaction" component={UserInfo}/>
                    <Route exact path="/user/rechargemoney" component={UserInfo}/>
                    <Route exact path="/user/receivemoney" component={UserInfo}/>

                    <Route exact path="/admin/transaction" component={UserInfo}/>
                    <Route exact path="/admin/rechargemoney" component={UserInfo}/>
                    <Route exact path="/admin/receivemoney" component={UserInfo}/>
                    <Route exact path="/admin/userlist" component={UserInfo}/>
                    <Route exact path="/admin/transactionlist" component={UserInfo}/>
                    <Route exact path="/admin/addresslist" component={UserInfo}/>
                </div>
            </HashRouter >);
    }
}



module.exports= connect()(App);
