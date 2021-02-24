const express = require('express')
const bodyParser = require('body-parser')
var session = require('express-session');
const app = express()

app.set('view engine','ejs')
app.set('views','./views')
app.use(express.static('public'))

// pody-parser upload file baobao199
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//--body-parser
app.use(session({secret:'secret_pass_here'}))

app.listen(3000);
//set up
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200')
    res.hasHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials',true)
    next()
})
//moonges
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)
const { FormBuilder } = require('@angular/forms')
mongoose.connect('mongodb+srv://baobao199:baobao199@cluster0.c12op.mongodb.net/BookStore?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        console.log("MongoDB connected error")
    }else{
        console.log("MongoDB connected successfully")
    }
});

//postman
app.post('/api/cate', function(req,res){
    Category.find(function(err,items){
        if(err){
            res.json({kq:0, 'err':err})
        }else{
            res.json(items)
        }
    })
})

app.get('/',function(req,res){
    if(!req.session.user){
        res.redirect('/login')
    }
    else{
        res.render('home')
    }
})
app.get('/home',function(req,res){
    if(!req.session.user){
        res.redirect('/login')
    }
    else{
        res.render('home')
    }
})

var categoryRoutes = require('./routes/category');
app.use("/category", categoryRoutes);
app.use("/category/add", categoryRoutes);
app.use("/upload", categoryRoutes);
app.use("/edit", categoryRoutes);
app.use("/update", categoryRoutes);
app.use("/delete", categoryRoutes);
app.use("", categoryRoutes);

var bookRoutes = require('./routes/book');
app.use("/book", bookRoutes);
app.use("/book/add", bookRoutes);
app.use("/upload", bookRoutes);
app.use("/edit", bookRoutes);
app.use("/update", bookRoutes);
app.use("/delete", bookRoutes);

var accountRoutes = require('./routes/account');
app.use("/login", accountRoutes);
app.use("/profile", accountRoutes);
app.use("/process", accountRoutes);
app.use("/editprofile", accountRoutes)
app.use("",accountRoutes); //logout