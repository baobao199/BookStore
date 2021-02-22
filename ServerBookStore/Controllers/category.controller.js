var Category = require("../Models/Category.js");
const mongoose = require('mongoose');

module.exports.index = async function(req, res) {
    if(!req.session.user){
        res.redirect('/login')
    }
    else{
        Category.find(function(err,items){
            if(err){
                console.log('err')
            }
            else{
                res.render('Category/Category',{listCategories:items})
            }
        })     
    }
}
module.exports.addCategory = async function(req,res){
    if(!req.session.user){
        res.redirect('/login')
    }
    else{
        res.render('Category/AddCategory')
    }
    
}
module.exports.uploadCategory = async function(req,res){
    var newCate = new Category({
        name: req.body.txtCate,
        Books_id: []
    })
    newCate.save(function(err){
        if(err){
            console.log('Save cate error: '+err)
            res.json({kq:0})
        }
        else{
            res.redirect('/category');
        }
    })
}
module.exports.editCategory = async function (req,res) {
    idCate = req.body.idCategory
    Category.findById(idCate,function (err,items) {
        if(err){
            console.log(err)
        }
        else{
            res.render('Category/EditCategory',{cate:items})
        }
    })
}
module.exports.updateCategory = async function(req,res){
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
}
module.exports.deleteCategory = async function(req,res) {
    let idCate = req.body.idCategory
    Category.findByIdAndRemove(idCate,function(err){
        if(err){
            console.log('err')
        }else{
            res.redirect('/category')    
        }
    })
}
module.exports.findbyidCategory = async function(req,res){
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
}