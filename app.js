const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const ejsMate = require('ejs-mate')
const method_override = require('method-override')
const ExpressError = require('./utils/ExpressError')
const session = require('express-session')

const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews')

const app = express()

const DataBase = process.env.MONGODB_URL

mongoose.connect(DataBase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB Atlas database');
})
mongoose.connection.on('error', (error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
})

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true}))
app.use(method_override('_method'))
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    secret: 'ThisShouldBeBetter',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))

app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)

// Home route
app.get('/', (req, res) => {
    res.render('home')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not fount', 404))
})

// Error handler
app.use((err, req, res, next) => {
    const {statusCode = 500} = err
    if (!err.message) err.message = 'oh No, Something Went Wrong!'
    res.status(statusCode).render('error', {err})
})

// Server Port
const port = process.env.PORT
app.listen(port, () => {
    console.log(`The server is running on PORT ${port}`)
})