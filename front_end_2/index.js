
var express = require('express'),
    session = require('express-session'),
    bodyParse = require('body-parser')

var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParse.json());
app.use(session({
    secret: 'jsdf7389isacuy28',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000*60*60*24}
}))

app.listen(3000,()=>{
    console.log('Server is listening....')
})

app.get('/', (req, res) => {
    res.render('home');
});

//GET '*' phải để ở cuối cùng, khi mà những điều trên không thỏa
app.get('*', (req, res) => {
  res.render('home');
});

app.post('/signin',(req,res)=>{
    var email = req.body.email;
    console.log(email);
    if(email=="phuc@123"){
        req.session.email=email;
        console.log(req.session.email);

        return res.send({mess:'DANG_NHAP_THANH_CONG'});
    }
    res.send({mess:'DANG_NHAP_THAT_BAI'})
})

app.get('/getinfo',(req,res)=>{
    console.log("AAAA"+req.session.email);
    if(req.session.email){
        return res.send({email:req.session.email})
    }
    res.send('CHUA_DANG_NHAP')
})


