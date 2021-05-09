const config = require('../config/databaseConfig')

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    birthDate: Date,
    phone: String,
    avatar: String
})

module.exports = mongoose.model('users', userSchema)