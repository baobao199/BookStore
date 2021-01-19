const mongodb = require('mongoose')
//Schema cau truc cua bang 
const categorySchema = new mongodb.Schema({
    name: String,
    Books_id: [{type: mongodb.Types.ObjectId}]
})

module.exports = mongodb.model('Category', categorySchema);


