const express = require('express')
const router = express.Router({mergeParams: true})
const { validateReview } = require('../middleware')


const Campground = require('../models/campground')
const Review = require('../models/review')

const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')

// POST New review
router.post('/', validateReview, catchAsync(async(req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    if (!campground) {
        throw new ExpressError('Campround not found', 404)
    }
    const review = new Review(req.body.review)
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash('success', 'Review created successfully')
    res.redirect(`/campgrounds/${campground._id}`)
}))

// Delete review
router.delete('/:reviewid', catchAsync(async(req, res) => {
    const {id, reviewid } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: {reviews: reviewid}})
    await Review.findByIdAndDelete(reviewid)
    req.flash('success', 'Review deleted successfully')
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router