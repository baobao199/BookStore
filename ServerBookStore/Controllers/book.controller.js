var Book = require("../Models/Book.js");
var Category = require("../Models/Category")
const mongoose = require('mongoose');

module.exports.index = async function(req, res) {
    if(!req.session.user){
        res.redirect('/login')
    }
    else{
        Book.find(function(err,items){
            if(err){
                console.log('err')
            }
            else{
                res.render('Book/book',{listBooks:items})
            }
        })
    }
    
}
module.exports.addBook = async function(req,res){
    if(!req.session.user){
        res.redirect('/login')
    }
    else{
        Category.find(function(err,items){
            if(err){
                console.log('Error')
            }
            else{
                console.log(items)
                res.render('Book/addbook',{Cates:items})
            }
        })
    }

}

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

module.exports.uploadBook = async function(req,res){
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
}

module.exports.editBook = async function (req,res) {
    txtIdBook = req.body.idBook
    Book.findById(txtIdBook,function(err,itemBook) {
        if(err){
            console.log(err)
        }else{
            res.render('book/editbook',{book:itemBook})
        }
    })
}
module.exports.updateBook = async function (req,res) {
    txtName = req.body.txtName
    txtId = req.body.id
    txtAuthor = req.body.txtAuthor
    txtPrice = req.body.txtPrice
    txtPubCompany = req.body.txtPubCompany
    txtDatePublic = req.body.txtDatePublic
    txtDescrip = req.body.txtDescrip

    Book.findByIdAndUpdate(txtId,{name: txtName, author: txtAuthor, price: txtPrice, pubCompany: txtPubCompany, datePublic: txtDatePublic, description: txtDescrip},{new: true},function(err,response){
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/book')
        }
    })
}
module.exports.deleteBook = async function (req,res) {
    let idBook = req.body.idBook
    Book.findByIdAndRemove(idBook,function(err){
        if(err){
            console.log('err')
        }else{
            res.redirect('/book')    
        }
    })
}