const app = () => {
    const express = require('express')
    const userController = require('../controllers/userController')

    const router = express.Router()

    router.get('/', userController.findAllUsers)
    router.get('/:id', userController.findOneUser)
    router.post('/', userController.create)
    router.put('/:id', userController.update)
    router.delete('/:id', userController.delete)

    return router

}

module.exports = app