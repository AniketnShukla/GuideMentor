const express = require('express')
const path = require('path')
const router = express.Router()
const quoteController = require('../controllers/quoteController')
router.route('/')
.get(quoteController.getQuoteData)
.post(quoteController.saveQuote)
// .patch(usersController.updateUser)
// .delete(usersController.deleteUser)

// router.route('/get-med-info')
// .post(medsController.getMedInfo)

// router.route('/buy')
// .post(medsController.updateMeds)

module.exports = router