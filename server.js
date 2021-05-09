const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = require('./App/config/databaseConfig')

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

const userRoutes = require('./App/routes/userRoute')
app.use('/users', userRoutes())

const port = 8080

app.listen(port, () => {
    console.log('You are on port : ' + port)
})

mongoose.connect(db.url, {
        useNewUrlParser: true
    })
    .then(() => console.log('You are connected to mongodb'))
    .catch(err => console.log(err))