import React from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import Home from './home_page/index';
import SignIn from './user_pages/signin_page/signin_page';
import SignUp from './user_pages/signup_page/signup_page';
import Nav from './navbar/nav';
import UserInfo from './user_pages/user_info_page/user_info_page'
import SendMoney from './user_pages/send_money_page/sendmoney_page'
import ReceiveMoneyPage from './user_pages/receive_money_page/receive_money_page'
import {connect} from 'react-redux';
import {getInfoRequest} from '../actions/index'



class App extends React.Component {
    componentDidMount(){
        this.props.getInfo();
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Nav/>
                    <div className="clear-float">
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/user/signup" component={SignUp}/>
                        <Route exact path="/user/info" component={UserInfo}/>
                        <Route exact path="/user/sendmoney" component={SendMoney}/>
                        <Route exact path="/user/receivemoney" component={ReceiveMoneyPage}/>
                        <Route exact path="/user/signin" component={SignIn}/>
                    </div>
                </div>
            </BrowserRouter>);
    }
}


function mapStateToProps (state) {
    return {is_signin:state.is_signin}
}

function mapDispatchToProps (dispatch) {
    return {
        getInfo: () => dispatch(getInfoRequest())
    }
}

module.exports= connect(mapStateToProps, mapDispatchToProps)(App);
