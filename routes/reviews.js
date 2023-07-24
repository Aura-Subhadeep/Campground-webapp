const express = require('express')
const router = express.Router({mergeParams: true})

const Campground = require('../models/campground')
const Review = require('../models/review')

const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')

const {reviewSchema} = require('../schemas.js')

// Validate new review
const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

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
    res.redirect(`/campgrounds/${campground._id}`)
}))

// Delete review
router.delete('/:reviewid', catchAsync(async(req, res) => {
    const {id, reviewid } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: {reviews: reviewid}})
    await Review.findByIdAndDelete(reviewid)
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router