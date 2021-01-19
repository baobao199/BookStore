const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine','ejs')
app.set('views','./views')
app.use(express.static('public'))

// pody-parser upload file baobao199
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//--body-parser

app.listen(3000);
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

const Category = require('./Models/Categories') //them model

app.get('/',function(req,res){
    res.render('home')
})

app.get('/cate',function(req,res){
    res.render('cate')
})

app.post('/cate',function(req,res){
    //res.send(req.body.txtCate)
    var newCate = new Category({
        name: req.body.txtCate,
        Books_id: []
    })
    //res.json(newCate)
    newCate.save(function(err){
        if(err){
            console.log('Save cate error: '+err)
            res.json({kq:0})
        }
        else{
            console.log('Save successfully')
            res.json({kq:1})
        }
    })
})
