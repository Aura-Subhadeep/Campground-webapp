const mongoose = require('mongoose')
const Schema = mongoose.Schema

const campGroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String
})

const Campground = mongoose.model('Campground', campGroundSchema)

module.exports = Campground