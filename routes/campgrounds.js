const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/campground')
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware')


// Campgrounds route
router.get('/', async(req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
})

// New route
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new')
})

// POST New campground
router.post('/', isLoggedIn, validateCampground, catchAsync (async(req, res, next) => {
    const campground = new Campground(req.body.campground)
    campground.author = req.user._id
    await campground.save()
    req.flash('success','Succesfully created campground')
    res.redirect(`/campgrounds/${campground._id}`)
}))

// Show route
router.get('/:id', catchAsync (async(req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews').populate('author')
    if(!campground){
        req.flash('error', 'Cannot find that campground')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', {campground})
}))

// Edit New campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync (async(req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('sccess', 'Canot find that campground')
        return res.redirect('/campgrounds')
    } 
    res.render('campgrounds/edit', {campground})
}))

// PUT Update (Edit) campground
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync (async(req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
    req.flash('success', 'Campground edited successfully')
    res.redirect(`/campgrounds/${campground._id}`)
}))

// Delete campground
router.delete('/:id/', isLoggedIn, isAuthor, catchAsync(async(req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Campground deleted opps')
    res.redirect('/campgrounds')
}))

module.exports = router