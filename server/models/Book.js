const mongoose = require('mongoose')
const BookSchema = new mongoose.Schema({
    judul: String,
    pengarang: String,
    harga: Number,
    stok: Number,
    deskripsi: String,
    cover: String,
    kategori: [String],
    bahasa: String,
})

const BookModel = mongoose.model("books", BookSchema)
module.exports = BookModel