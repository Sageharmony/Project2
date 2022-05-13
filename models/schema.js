const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    title: String,
    img: String,
    about: String,
    location: String,
    inspiration: String,
    price: Number
})

const verify = mongoose.model('Data', schema)

module.exports = verify;