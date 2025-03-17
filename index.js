const express = require('express');
const db = require('./configs/database');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const local = require('./middleware/passport-local');
const Blog = require('./models/blogModel');
const port = 9091;
const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/uploads",express.static(__dirname + "/uploads"));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use(passport.initialize());  
app.use(passport.session());     
app.use(passport.userLocalData);


app.use('/',require('./routers'));

app.listen(port , (err)=>{
    db();
    if(!err){
        console.log("Server Start on");
        console.log("http://localhost:"+port);
    }
})