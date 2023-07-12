const mongoose = require('mongoose')
const Schema = mongoose.Schema

const campGroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
})

const Campground = mongoose.model('Campground', campGroundSchema)

module.exports = Campground