const mongodb = require('mongoose')
//Schema cau truc cua bang 
const bookSchema = new mongodb.Schema({
    name: String,
    image: String,
    file: String
})

module.exports = mongodb.model('Book',bookSchema);

