const express = require('express')
const router = express.Router()
const pricing = require('../controllers/aboutpage')

router.route('/')
    .get(pricing.renderAboutpage)

module.exports = router