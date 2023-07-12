const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
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

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`The server is running on PORT ${port}`)
})