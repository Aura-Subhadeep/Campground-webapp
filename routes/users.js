const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user')
const passport = require('passport')

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async (req, res) => {
    try {
    const {email, username, password} = req.body
    const user = new User({ email, username})
    const registerdUser = await User.register(user, password)
    console.log(registerdUser)
    req.flash('success', 'welcomome , you just have registered')
    res.redirect('/campgrounds')
    } catch (e) {
        req.flash('success', e.message)
        res.redirect('register')
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('error', 'welcome back')
    res.redirect('/campgrounds')
})

module.exports = router