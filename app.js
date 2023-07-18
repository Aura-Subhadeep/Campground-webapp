const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const ejsMate = require('ejs-mate')
const joi = require('joi')
const {campgroundSchema} = require('./schemas.js')
const catchAsync = require('./utils/catchAsync')
const expressError = require('./utils/expressError')
const method_override = require('method-override')
const Campground = require('./models/campground')
const ExpressError = require('./utils/expressError')

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

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true}))
app.use(method_override('_method'))

const validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

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
app.post('/campgrounds', validateCampground, catchAsync (async(req, res, next) => {
    const campground = new Campground(req.body.campground)
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
}))

// Show route
app.get('/campgrounds/:id', catchAsync (async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', {campground})
}))

// Edit New campground
app.get('/campgrounds/:id/edit', catchAsync (async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground})
}))

// PUT Update (Edit) campground
app.put('/campgrounds/:id', validateCampground, catchAsync (async(req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
    res.redirect(`/campgrounds/${campground._id}`)
}))

// Delete campground
app.delete('/campgrounds/:id/', catchAsync(async(req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
}))

app.all('*', (req, res, next) => {
    next(new expressError('Page not fount', 404))
})

// Error handler
app.use((err, req, res, next) => {
    const {statusCode = 500} = err
    if (!err.message) err.message = 'oh No, Something Went Wrong!'
    res.status(statusCode).render('error', {err})
})

// Server Port
const port = process.env.PORT
app.listen(port, () => {
    console.log(`The server is running on PORT ${port}`)
})