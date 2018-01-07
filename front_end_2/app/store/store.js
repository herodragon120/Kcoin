const redux = require('redux');
const reducer = require('../reducers/reducers');
import thunk from 'redux-thunk';


let store = redux.createStore(
    reducer,
    redux.compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ),
    redux.applyMiddleware(thunk)
);


module.exports = store;