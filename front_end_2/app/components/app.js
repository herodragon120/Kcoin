import React from 'react';
import {HashRouter , Route, Redirect} from 'react-router-dom';
import Home from './home_page/index';
import SignIn from './signin_page/signin_page';
import SignUp from './signup_page/signup_page';
import Nav from './navbar/nav';
import DetailBlock from './detail_block_page/detail_block_page'
import UserInfo from './user_pages/user_page'
import {connect} from 'react-redux';



class App extends React.Component {
    render() {
        return (
            <HashRouter >
                <div>
                    <Nav/>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/:id" component={DetailBlock}/>
                    <Route exact path="/user/signup" component={SignUp}/>
                    <Route exact path="/user/info" component={UserInfo}/>
                    <Route exact path="/user/sendmoney" component={UserInfo}/>
                    <Route exact path="/user/rechargemoney" component={UserInfo}/>
                    <Route exact path="/user/receivemoney" component={UserInfo}/>
                    <Route exact path="/user/signin" component={SignIn}/>
                </div>
            </HashRouter >);
    }
}



module.exports= connect()(App);
