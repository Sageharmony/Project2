const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collectionSchema = new Schema({
    name: String,
    value: { title: String, img: String, about: String, location: String, inspiration: String, price: Number }    
})

const Export = mongoose.model('Export', collectionSchema);

module.exports = Export;