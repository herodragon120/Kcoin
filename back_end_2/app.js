var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    crypto = require('crypto'),
    user_controller = require('./controllers/user_controller')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: 'jsdf7389isacuy28',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000*60*60*24}
}))

app.listen(5000,function () {
   console.log('Server is listening....');
});

app.use(user_controller);

