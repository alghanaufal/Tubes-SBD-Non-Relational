const mongoose = require('mongoose')
const BookSchema = new mongoose.Schema({
    judul: String,
    author: String,
    image: String
})

const BookModel = mongoose.model("books", BookSchema)
module.exports = BookModel