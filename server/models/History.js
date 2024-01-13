const mongoose = require('mongoose')
const HistorySchema = new mongoose.Schema({
    judul: String,
    pengarang: String,
    harga: Number,
    deskripsi: String,
    cover: String,
})

const HistoryModel = mongoose.model("history", HistorySchema)
module.exports = HistoryModel