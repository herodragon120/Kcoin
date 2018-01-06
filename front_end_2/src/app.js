var React = require('react');
var ReactDOM = require('react-dom');
var {BrowserRouter, Route} = require('react-router-dom');

var redux = require('redux');
var {Provider} = require('react-redux');

var store = require("./store/store");
var App=require('App');

require('style!css!foundation-sites/dist/css/foundation.css');
require('style!css!./css/bootstrap.min.css');
$(document).ready(() => $(document).foundation());


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
