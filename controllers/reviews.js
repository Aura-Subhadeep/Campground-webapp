const Campground = require('../models/campground')
const Review = require('../models/review')

module.exports.createReviews = (async(req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    const review = new Review(req.body.review)
    review.author = req.user._id
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash('success', 'Review created successfully')
    res.redirect(`/campgrounds/${campground._id}`)
})

module.exports.deleteReview = (async(req, res) => {
    const {id, reviewid } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: {reviews: reviewid}})
    await Review.findByIdAndDelete(reviewid)
    req.flash('success', 'Review deleted successfully')
    res.redirect(`/campgrounds/${id}`)
})