const joi = require('joi')

module.exports.campgroundSchema = joi.object({
    campground: joi.object({
        title: joi.string().required(),
        // image: joi.required(),
        location: joi.string().required(),
        description: joi.string().required(),
        price: joi.number().required().min(0),
    }).required(),
    deleteImages: joi.array()
})

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        body: joi.string().required()
    }).required()
})