const express = require('express')
const path = require('path')
const router = express.Router()
const userController = require('../controllers/userController')
router.route('/')

// .get(userController.getAllusers)
// .post(userController.createNewUser)
// .patch(userController.updateUser)
// .delete(userController.deleteUser)

// router.route('/get-all-orders')
// .post(userController.getAllOrders)

router.route('/signup')
.post(userController.createNewUser)

router.route('/login')
.post(userController.loginUser)

router.route('/emotion')
.post(userController.getUserEmotions)

router.route('/quote')
.post(userController.saveQuote)




// router.route('/buy')
// .post(userController.placeOrder)
module.exports = router