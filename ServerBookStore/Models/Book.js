const mongodb = require('mongoose')
//Schema cau truc cua bang 
const bookSchema = new mongodb.Schema({
    image: String,
    name: String,
    author: String,
    price: Number,
    pubCompany: String,
    datePublic: String,
    description: String
})

module.exports = mongodb.model('Book',bookSchema);

