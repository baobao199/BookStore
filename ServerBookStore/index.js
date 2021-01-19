const express = require('express')
const app = express()

app.set('view engine','ejs')
app.set('views','./views')
app.use(express.static('public'))

app.listen(3000);
// pody-parser upload file baobao199
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
//--body-parser

//moonges
const mongoose = require('mongoose');
const { FormBuilder } = require('@angular/forms')
mongoose.connect('mongodb+srv://baobao199:baobao199@cluster0.c12op.mongodb.net/BookStore?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        console.log("MongoDB connected error")
    }else{
        console.log("MongoDB connected successfully")
    }
});
app.get('/',function(req,res){
    res.render('home')
})

app.get('/cate',function(req,res){
    res.render('cate')
})

app.post('/cate',function(res,req){
    res.send(req.body.txtCate)
})
