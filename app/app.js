var React = require('react');
var ReactDOM = require('react-dom');
var {BrowserRouter, Route} = require('react-router-dom');

var redux = require('redux');
var {Provider} = require('react-redux');

var store = require("./store/index");
var App=require('App');

require('style!css!foundation-sites/dist/css/foundation.css');
require('style!css!./css/style.css');
require('style!css!./css/blockchain.css');
require('style!css!./css/overrides.min.css');
require('style!css!./css/bootstrap.min.css');
require('script!./js/bootstrap.min');
require('script!./js/homepage.min');
require('script!./js/jquery.min');
require('script!./js/navbar');
$(document).ready(() => $(document).foundation());


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
