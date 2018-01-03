import React from 'react';
import './login.component.css';
import axios from 'axios';
import user from '../local'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        }

        var self = this;
        self.onLogin = (e) => {
            e.preventDefault();
            var data = {
                username: this.inputUsername.value,
                password: this.inputPassword.value
            };
            // axios.defaults.withCredentials = true;
            axios.post(`http://localhost:5000/wallet/api/login`, data)
                .then(function (res) {
                    console.log(res)
                    if(res.data.code === 200){
                        console.log(res.data.user)
                        sessionStorage.username = res.data.user.username;
                        sessionStorage.value = res.data.user.value;
                        sessionStorage.name = res.data.user.name;
                        window.location='/'
                    }
                })
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    <h1>Welcome</h1>
                    <form classID="form">
                        <input type="text" id="username" placeholder="username" ref={node => {
                            if (node) this.inputUsername = node;
                        }}/>
                        <input type="password" id="password" placeholder="password" ref={node => {
                            if (node) this.inputPassword = node;
                        }}/>
                        <button id="login-button" onClick={this.onLogin}>Login</button>
                    </form>
                </div>
                <div className="bg-bubbles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </div>
            </div>
        )
    }
}

export default Login;