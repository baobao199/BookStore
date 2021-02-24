var Account = require("../Models/Account");
const mongoose = require('mongoose');

module.exports.index = async function(req, res) {
    res.render('Admin/login')
}

module.exports.loginAccount = async function(req,res){
    txtemail = req.body.email
    txtpass = req.body.pswd
    Account.find(function(err,items) {
        if(err){
            console.log(err)
        }
        else{
            items.forEach(function (account) {
                if( txtemail == account.username && txtpass == account.password){
                    req.session.user = account.username
                    res.redirect('/home')
                }
            })
           res.render('admin/login',{message:'Username or password is not correct'})
        }
    })
}
module.exports.logoutAccount = async function (req,res) {
    req.session.destroy();
    res.redirect('/login')
}

module.exports.profileAccount = async function (req,res) {
    Account.find(function(err,items) {
        if(err){
            console.log(err)
        }
        else{
            items.forEach(function (account) {
                if( req.session.user == account.username){
                    console.log(account)
                    res.render('Admin/profile',{list:account})
                }
            })
            
        }
    })
}

module.exports.editProfile = async function(req,res) {
    res.render('admin/editprofile')
}