import React from 'react';
import './user.home.css';
import axios from 'axios';
import './history.css';
import user from '../local'

class User extends React.Component {
    constructor(props){
        super();
        this.state = {
            name: sessionStorage.name,
            value: sessionStorage.value,
            item:[],
            error: ""
        }

        var self = this;
        self.onExchange = (e) => {
            e.preventDefault();
            var data = {
                from: sessionStorage.username,
                reciever: this.inputRecieverUsername.value,
                value: this.inputValue.value,
                date: new Date()
            }
            // axios.defaults.withCredentials = true;
            axios.post(`http://localhost:5000/wallet/api/transaction`, data)
                .then(function (res) {
                    console.log(res);
                    console.log(data)
                    sessionStorage.value = sessionStorage.value - res.data.value;
                    if(res.data.message === "please Login First!")
                        window.location = "/login"
                    var tmpData = self.state.item;
                    tmpData.push(res.data)
                    if(tmpData.length>10)
                        tmpData.splice(0,1);
                    console.log(tmpData)
                    self.setState({ item: tmpData
                        , value: sessionStorage.value})
            })
        }
    }

    componentWillMount(){
        var self = this;
        axios.get(`http://localhost:5000/wallet/api/transaction`, {params: {"username":sessionStorage.username}})
            .then(function (res) {
                console.log(res.data.data)
                sessionStorage.history = JSON.stringify(res.data.data);
                self.setState({
                    item: res.data.data
                })
            })
        axios.get(`http://localhost:5000/wallet/api/all-transaction`)
            .then(function (res) {
                sessionStorage.allHistory = JSON.stringify(res.data.data);
            })
    }

    onLogin(e){
        e.preventDefault();
        window.location = '/login'
    }

    onLogout(e){
        e.preventDefault();
        sessionStorage.clear();
        window.location = '/'
    }

    onSignin(e){
        e.preventDefault();
        window.location = '/signin';
    }
    renderLoginButton(){
        return(
            <form>
                <button onClick={e => this.onLogin(e)}>Login</button>
            </form>
        )
    }

    renderLogoutButton(){
        return(
            <form>
                <button onClick={e => this.onLogout(e)}>Logout</button>
            </form>
        )
    }

    renderSigninButton(){
        return(
            <form>
                <button onClick={e => this.onSignin(e)}>Sign In</button>
            </form>
        )
    }

    render() {
        return (
            <div className="user-wrapper">
                <div className="user-container">
                    <p>Hello {sessionStorage.name}</p>
                    <span>Your wallet got: <h2>{sessionStorage.value}$</h2></span>
                    <h1>History Transaction</h1>
                    <ul>
                        {this.state.item.map((item, index) => (
                            <li>From: {item.from===sessionStorage.username?"You ":item.from}
                            - To: {item.to===sessionStorage.username?"You ":item.to}
                            - Value: {item.value} - Date: {item.date}</li>
                        ))}
                    </ul>
                </div>

                <div className="transaction">
                    <h1>Make Exchange!!!</h1>
                    <form>
                        <input type="text" id="username" placeholder="Reciever User Name" ref={node => {
                            if(node) this.inputRecieverUsername = node;
                        }}/>
                        <input type="number" id="value" placeholder="Value" ref={node => {
                            if(node) this.inputValue = node;
                        }}/>
                        <button onClick={this.onExchange}>Send</button>
                    </form>
                    <div className="footer">
                        {!sessionStorage.username?this.renderLoginButton():this.renderLogoutButton()}
                        {this.renderSigninButton()}
                        All transaction
                        <ul>
                            {JSON.parse(sessionStorage.allHistory).map((item, index) => (
                                <li>From: {item.from===sessionStorage.username?"You ":item.from}
                                    - To: {item.to===sessionStorage.username?"You ":item.to}
                                    - Value: {item.value} - Date: {item.date}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default User;