const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cities = require('./cities')
const {places, description, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

const DataBase = process.env.MONGODB_URL

mongoose.connect(DataBase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB Atlas database');
})
mongoose.connection.on('error', (error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
})

// const sample = array => array[Math.floor(Math.random() * array.length)]

// const seedDB = async () =>{
//     await Campground.deleteMany({})
//     for(let i = 0; i < 50; i++) {
//         const random = Math.floor(Math.random() * 100)
//         const camp = new Campground({
//             location: `${cities[random].city}, ${cities[random].state}`,
//             title: `${sample(descriptors)}, ${sample(places)}`
//         })
//         await camp.save()
//     }
// }

// seedDB().then(() => {
//     mongoose.connection.close()
// })