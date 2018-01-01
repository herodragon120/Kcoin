var React = require('react');
var ReactDOM = require('react-dom');
var {BrowserRouter, Route} = require('react-router-dom');

var redux = require('redux');
var {Provider} = require('react-redux');

var store = require("./store/index");
var App=require('App');

require('style!css!foundation-sites/dist/css/foundation.css');
require('style!css!./publics/css/style.css');
require('style!css!./publics/css/bootstrap.min.css');
//require('script!./publics/js/bootstrap.min');
require('script!./publics/js/jquery-3.2.1.min');
$(document).ready(() => $(document).foundation());


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
