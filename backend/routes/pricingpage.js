const express = require('express')
const router = express.Router()
const pricing = require('../controllers/pricingpage')

router.route('/')
    .get(pricing.renderpricingpage)

module.exports = router