const mongodb = require('mongoose')
//Schema cau truc cua bang 
const accountSchema = new mongodb.Schema({
    username : String,
    password : String,
    name : String,
    address : String,
    phonenumber : String,
    birthday: String,
})

module.exports = mongodb.model('Account',accountSchema);