const express = require('express')
const router = express.Router({mergeParams: true})
const reviews = require('../controllers/reviews')
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const Campground = require('../models/campground')
const Review = require('../models/review')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReviews))

router.delete('/:reviewid', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router