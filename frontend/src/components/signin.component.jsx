import React from 'react'
import './login.component.css'
import axios from 'axios';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        }
        var self = this;

        self.onSignin = (e) => {
            e.preventDefault();
            var data = {
                username: this.inputUsername.value,
                password: this.inputPassword.value,
                name: this.inputName.value
            }
            axios.post(`http://localhost:5000/wallet/api/signin`, data)
                .then(function (res) {
                    self.setState({error: res.data.message});
                    window.location = '/'
                })
        }
    };

    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    <h1>Welcome</h1>
                    <form className="form">
                        <input type="text" id="name" placeholder="name" ref={(node) => {
                            if (node) {
                                this.inputName = node
                            }
                        }}/>
                        <input type="text" id="username" placeholder="username" ref={node => {
                            if (node) this.inputUsername = node
                        }} required/>
                        <input type="password" id="password" placeholder="password" ref={node => {
                            if (node) this.inputPassword = node
                        }} required="true"/>
                        <button id="signin-button" onClick={this.onSignin}>Sign In</button>
                    </form>
                    <div className="error">
                        <p>{this.state.error}</p>
                    </div>
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

export default Signin;