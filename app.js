const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const method_override = require('method-override')
const Campground = require('./models/campground')

const app = express()

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

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true}))
app.use(method_override('_method'))

// Home route
app.get('/', (req, res) => {
    res.render('home')
})

// Campgrounds route
app.get('/campgrounds', async(req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
})

// New route
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

// POST New campground
app.post('/campgrounds', async(req, res) => {
    const campground = new Campground(req.body.campground)
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
})

// Show route
app.get('/campgrounds/:id', async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', {campground})
})

// Edit New campground
app.get('/campgrounds/:id/edit', async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground})
})

// PUT Update campground
app.put('/campgrounds/:id', async(req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
    res.redirect(`/campgrounds/${campground._id}`)
})

// Server Port
const port = process.env.PORT
app.listen(port, () => {
    console.log(`The server is running on PORT ${port}`)
})