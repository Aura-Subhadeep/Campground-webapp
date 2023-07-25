const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground')
const {campgroundSchema} = require('../schemas.js')

// Validate new campground
const validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

// Campgrounds route
router.get('/', async(req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
})

// New route
router.get('/new', (req, res) => {
    res.render('campgrounds/new')
})

// POST New campground
router.post('/', validateCampground, catchAsync (async(req, res, next) => {
    const campground = new Campground(req.body.campground)
    await campground.save()
    req.flash('success','Succesfully created campground')
    res.redirect(`/campgrounds/${campground._id}`)
}))

// Show route
router.get('/:id', catchAsync (async(req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews')
    if(!campground){
        req.flash('error', 'Cannot find that campground')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', {campground})
}))

// Edit New campground
router.get('/:id/edit', catchAsync (async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground})
}))

// PUT Update (Edit) campground
router.put('/:id', validateCampground, catchAsync (async(req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
    req.flash('success', 'Campground edited successfully')
    res.redirect(`/campgrounds/${campground._id}`)
}))

// Delete campground
router.delete('/:id/', catchAsync(async(req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Campground deleted opps')
    res.redirect('/campgrounds')
}))

module.exports = router