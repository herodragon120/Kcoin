var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var path = require('path');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(morgan('dev'));
app.use(express.static(
    path.resolve(__dirname, 'public')
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.listen(3000, () => console.log('Server started'))
app.get('/', (req, res) => res.render('home'));
app.get('*', (req, res) => {
    res.render('home');
});
