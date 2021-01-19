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
//add Model
const Category = require('./Models/Category')
const Book = require('./Models/Book')
//-Model
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

app.get('/book',function(req,res){
    Category.find(function(err,items){
        if(err){
            console.log('Error')
        }
        else{
            console.log(items)
            res.render('book',{Cates:items})
        }
    })
})

//multer
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/upload')
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname) //cau hinh ten file tranh trunn file
    }
})
var upload = multer({
    storage: storage,
    fileFilter: function(req,file,cb){
        console.log(file)
        if( file.mimetype=='image/jpg' || 
            file.mimetype=='image/png' ||
            file.mimetype=='image/jpeg')
        {
            cb(null,true)
        }
        else{
            return cb(new Error('Only image are allowed'))
        }
    }
}).single('BookImage') //name thu muc hinh o form

app.post('/book',function(req,res){
    //upload image
    upload(req,res, function(err){
        if(err instanceof multer.MulterError){
            console.log('A Multer error occurred when uploading')
            res.json({kq: 0, 'err: ': err})
        }else if(err){
            console.log('An unknown error occurred when uploading: '+err)
            res.json({kq: 0, 'err': err})
        }else{
            console.log('Upload is okay')
            console.log(req.file) //thong tin file da upload
            res.send({kq:1, 'file': req.file})
        }
    })
    //Save Book
})