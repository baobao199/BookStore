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
//add Model
const Category = require('./Models/Category')
const Book = require('./Models/Book')

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
//Model
app.get('/',function(req,res){
    Category.find(function(err,items){
        if(err){
            console.log('err')
        }
        else{
            res.render('home',{listCategories:items})
        }
    })
})
app.get('/cate',function(req,res){
    res.render('cate')
})
//--model

//get list categories from mongoDB
app.get('/category',function(req,res){
    Category.find(function(err,items){
        if(err){
            console.log('err')
        }
        else{
            res.render('Category/Category',{listCategories:items})
        }
    })
})
app.get('/addcategory',function(req,res){
    res.render('Category/AddCategory')
})

app.post('/addcategory',function(req,res){
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
            //res.json({kq:1})
            res.redirect('/category');
        }
    })
})
//delete by id cate
app.post('/xuly',function(req,res){
    let idCate = req.body.idCategory
    Category.findByIdAndRemove(idCate,function(err){
        if(err){
            console.log('err')
        }else{
            res.redirect('/category')    
        }
    })
})
app.post('/book',function(req,res){
    idCate = req.body.idCategory
    Category.findById(idCate,function(err,items){   
        if(err){
            console.log(err)
        }
        else{
            var test = Category.aggregate([{
                $lookup:{
                    from : 'books',
                    localField: 'Books_id',
                    foreignField: '_id',
                    as: 'tmp'
                }
            }],function(err,data){
                if(err){
                    console.log(err)
                }
                else{
                    for(var i = 0; i < data.length;i++){
                        if(data[i]._id == idCate){
                            res.render('Book/book',{listBooks:data[i].tmp})
                        }
                        else{
                            console.log('null')
                        }
                    }
                    
                }
            })
        }
    })
})

//edit
app.post('/editcategory',function (req,res){
    idCate = req.body.idCategory
    Category.findById(idCate,function (err,items) {
        if(err){
            console.log(err)
        }
        else{
            res.render('Category/EditCategory',{cate:items})
        }
    })
})
//update
app.post('/xuly',function(req,res){
    txtname = req.body.txtCate
    id = req.body.txtid
    Category.findByIdAndUpdate(id,{name: txtname},{new: true},function(err,response){
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/category')
        }
    })
})
//--category

//image
//multer
var multer = require('multer')
const e = require('express')
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
}).single('txtImage') //name thu muc hinh o form
//--image

app.get('/book',function(req,res){
    Book.find(function(err,items){
        if(err){
            console.log('err')
        }
        else{
            console.log(Book)
            res.render('Book/book',{listBooks:items})
        }
    })
    
})

app.get('/addbook',function(req,res){
    Category.find(function(err,items){
        if(err){
            console.log('Error')
        }
        else{
            console.log(items)
            res.render('Book/addbook',{Cates:items})
        }
    })
})
app.post('/addbook',function(req,res){
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
            //res.send({kq:1, 'file': req.file})
            
            //Save Book
            var book = new Book({
                image: req.file.filename,
                name: req.body.txtName,
                author: req.body.txtAuthor,
                price: req.body.txtPrice,
                pubCompany: req.body.txtPubCompany,
                datePublic: req.body.txtDatePublic,
                description: req.body.txtDescrip,
            })
            //res.json(book)
            book.save(function(err){
                if(err){
                    res.json({
                        kq:0,
                        'err': "error upload book"
                    })
                }
                else{
                    //save book
                    Category.findOneAndUpdate(
                        {_id:req.body.selectCate},
                        { $push: {Books_id: book._id} },
                        function(err){
                            if(err){
                                res.json({kq:0, 'err': err})
                            }else{
                                //res.json({kq:1})
                                res.redirect('/book')
                            }
                    })
                }
            })
        }
    })
})





// app.get('/book',function(req,res){
//     Category.find(function(err,items){
//         if(err){
//             console.log('Error')
//         }
//         else{
//             console.log(items)
//             res.render('book',{Cates:items})
//         }
//     })
// })
// app.post('/book',function(req,res){
//     //upload image
//     upload(req,res, function(err){
//         if(err instanceof multer.MulterError){
//             console.log('A Multer error occurred when uploading')
//             res.json({kq: 0, 'err: ': err})
//         }else if(err){
//             console.log('An unknown error occurred when uploading: '+err)
//             res.json({kq: 0, 'err': err})
//         }else{
//             console.log('Upload is okay')
//             console.log(req.file) //thong tin file da upload
//             //res.send({kq:1, 'file': req.file})
            
//             //Save Book
//             var book = new Book({
//                 name: req.body.txtName,
//                 image: req.file.fieldname,
//                 file: req.file.txtFile
//             })
//             //res.json(book)
//             book.save(function(err){
//                 if(err){
//                     res.json({
//                         kq:0,
//                         'err': "error upload book"
//                     })
//                 }
//                 else{
//                     //save book
//                     Category.findOneAndUpdate(
//                         {_id:req.body.selectCate},
//                         { $push: {Books_id: book._id} },
//                         function(err){
//                             if(err){
//                                 res.json({kq:0, 'err': err})
//                             }else{
//                                 res.json({kq:1})
//                             }
//                     })
//                 }
//             })
//         }
//     })
// })