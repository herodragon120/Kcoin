var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser')

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

app.post('/login',function (req,res) {
    console.log(req.body);
    if(req.body.user_name=='phuc' && req.body.password=='123'){
        req.session.user_name = req.body.user_name;
        return res.send('DANG_NHAP_THANH_CONG');
    }
    return res.send('DANG_NHAP_THAT_BAI');
});

app.get('/logout',function (req,res) {
    req.session.user_name = undefined;
    res.send('DA_DANG_XUAT');
})

