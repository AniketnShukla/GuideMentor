const express = require('express')
const path = require('path')
const router = express.Router()
const customerController = require('../controllers/customerController')
router.route('/')
.get(customerController.getAllusers)
// .post(customerController.createNewUser)
// .patch(customerController.updateUser)
// .delete(customerController.deleteUser)

router.route('/get-all-orders')
.post(customerController.getAllOrders)

router.route('/signup')
.post(customerController.createNewUser)

router.route('/login')
.post(customerController.loginUser)

router.route('/buy')
.post(customerController.placeOrder)
module.exports = router