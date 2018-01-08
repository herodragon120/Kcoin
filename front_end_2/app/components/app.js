import React from 'react';
import {HashRouter , Route, Redirect} from 'react-router-dom';
import Home from './home_page/index';
import SignIn from './user_pages/signin_page/signin_page';
import SignUp from './user_pages/signup_page/signup_page';
import Nav from './navbar/nav';
import UserInfo from './user_pages/user_info_page/user_info_page'
import SendMoney from './user_pages/send_money_page/sendmoney_page'
import RechargeMoney from './user_pages/recharge_money_page/recharge_money_page'
import ReceiveMoneyPage from './user_pages/receive_money_page/receive_money_page'
import {connect} from 'react-redux';



class App extends React.Component {
    componentDidMount(){
    }
    render() {
        return (
            <HashRouter >
                <div>
                    <Nav/>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/user/signup" component={SignUp}/>
                    <Route exact path="/user/info" component={UserInfo}/>
                    <Route exact path="/user/sendmoney" component={SendMoney}/>
                    <Route exact path="/user/rechargemoney" component={RechargeMoney}/>
                    <Route exact path="/user/receivemoney" component={ReceiveMoneyPage}/>
                    <Route exact path="/user/signin" component={SignIn}/>
                </div>
            </HashRouter >);
    }
}



module.exports= connect()(App);
