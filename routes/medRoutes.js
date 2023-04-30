const express = require('express')
const path = require('path')
const router = express.Router()
const medsController = require('../controllers/medsController')
router.route('/')
.post(medsController.addNewMed)
.get(medsController.getMeds)
// .patch(usersController.updateUser)
// .delete(usersController.deleteUser)

router.route('/get-med-info')
.post(medsController.getMedInfo)

router.route('/buy')
.post(medsController.updateMeds)

module.exports = router