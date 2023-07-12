const express = require('express')
const app = express()


app.get('/', (req, res) => {
    res.send('Server in serving')
})
app.listen(3000, () => {
    console.log('Serving on Port 3000')
})