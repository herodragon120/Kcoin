var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var session = require('express-session');
var passport = require('passport');
var passportconfig = require('./config/passport')(passport);
var flash = require('connect-flash');

// var index = require('./routes/index');
var wallet = require('./routes/api/walletAPI');
var index = require('./routes/index');

var app = express();

// var url = 'mongodb://vanzez:Hiepga1996@ds01316.mlab.com:1316/wallet';
//mongoose connection
mongoose.connect('mongodb://localhost:27017/wallet');
var dbMongo = mongoose.connection;
dbMongo.on('err', console.error.bind(console, 'connect fail'));
dbMongo.once('open', function () {
    console.log('mongo connected');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});
//Enable All CORS Requests
// app.use(cors({credentials: true}));

app.use(logger('dev'));
app.use(cookieParser());
const cookieExpirationDate = new Date();
const cookieExpirationDays = 365;
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays);
app.use(session({secret: 'keyboard cat', saveUninitialized: true, resave: true, cookie: {
    secure: false,
    httpOnly: true,
    expires: cookieExpirationDate // use expires instead of maxAge
}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(err, req, res, next) {
    console.log(err);
});
app.use(flash());

// app.use('/', index);
app.use('/wallet/api', wallet);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// Session-persisted message middleware
app.use(function(req, res, next){
    var err = req.session.error,
        msg = req.session.notice,
        success = req.session.success;

    delete req.session.error;
    delete req.session.success;
    delete req.session.notice;

    if (err) res.locals.error = err;
    if (msg) res.locals.notice = msg;
    if (success) res.locals.success = success;

    next();
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// var allowCrossDomain = function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// }
// app.use(allowCrossDomain);

module.exports = app;
