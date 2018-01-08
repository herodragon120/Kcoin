
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

app.post('/signin',(req,res)=>{
    var wallet = req.body.wallet;
    console.log(wallet);
    if(wallet=="phuc@123"){
        req.session.wallet=wallet;
        return res.send({mess:'DANG_NHAP_THANH_CONG',wallet:wallet});
    }
    res.send({mess:'DANG_NHAP_THAT_BAI'})
})

app.get('/logout',(req,res)=>{
    req.session.wallet = null;
    return res.send({mess:'DANG_XUAT_THANH_CONG'})
})
//ham lay thong tin nguoi dung gồm: ví, số dư thực tế,khả dụng,là lịch sử giao dịch của người dùng
app.get('/getinfo',(req,res)=>{
        return res.send({wallet:req.session.wallet,kcoin_tt:100,kcoin_kd:90,user_transactions:{a:"1",b:"2"}})
})

//lay danh sách block mới
app.get('/getnewblock',(req,res)=>{
    return res.send('')
})

//lay tất cả các block
app.get('/getallblock',(req,res)=>{
    return res.send('')
})




