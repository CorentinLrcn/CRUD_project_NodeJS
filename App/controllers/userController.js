const { response, request } = require('express')
const users = require('../models/userModel')
const multer = require('multer')

exports.findAllUsers = (request, response) => {
    users.find()
        .then(data => {
            if (!data) return response.send('no user')
            response.send(data)
        })
        .catch(err => response.send('an error has occured ' + err))
}

exports.findOneUser = (request, response) => {
    const id = request.params.id

    users.findById(id)
        .then(data => {
            if (!data) return response.send('no user for id : ' + id)
            response.send(data)
        })
        .catch(err => response.send('an error has occured ' + err))
}

exports.create = (request, response) => {
    const newUser = new users(
        {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            birthDate: request.body.birthDate,
            phone: request.body.phone,
            avatar: request.body.avatar
        }
    )

    newUser.save()
        .then(data => response.send(data))
        .catch(err => response.send(err))
}

exports.update = (request, response) => {
    const id = request.params.id

    users.findByIdAndUpdate(id, request.body, { new: true })
        .then(data => {
            if (!data) return response.send("can't update, no user for id : " + id)
            response.send('update done')
        })
        .catch(err => response.send('an error has occured ' + err))
}

exports.delete = (request, response) => {
    const id = request.params.id

    users.findByIdAndRemove(id)
        .then(data => {
            if (!data) return response.send("can't delete, no user for id : " + id)
            response.send('deletion done')
        })
        .catch(err => response.send('an error has occured ' + err))
}

const imageStorage = multer.diskStorage({
    destination: './uploads',
    filename: (request, file, callback) => {
        callback(null, file.originalname)
    }
})

exports.uploadImage = multer({ 
    storage: imageStorage,
    fileFilter(request, file, callback) {
        if (!file.originalname.match(/\.(png|jpg)$/)) { 
            // upload only png and jpg format
            return callback(new Error('Please upload an image as avatar'))
          }
        callback(undefined, true)
    } 
})

exports.uploadAvatar = (request, response) => {
    const id = request.params.id
    users.findByIdAndUpdate(id, { "avatar": request.file.filename }, { new: true })
    .then(data => {
        if (!data) return response.send("can't update, no user for id : " + id)
        response.send('update done\n' + request.file)
    })
    .catch(err => response.send('an error has occured ' + err))
}, (error, request, response, next) => {
    response.status(400).send({ error: error.message })
}