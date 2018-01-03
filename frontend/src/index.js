import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import Signin from './components/signin.component'
import Login from "./components/login.component";
import User from "./components/user.home.component";

ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route exact path="/" component={User}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/login" component={Login}/>
        </div>
    </BrowserRouter>
), document.getElementById('root'))