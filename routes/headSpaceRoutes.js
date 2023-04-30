const express = require('express')
const path = require('path')
const router = express.Router()
const currentHeadspaceController = require('../controllers/currentHeadspaceController')
router.route('/')
// .post(medsController.addNewMed)
.get(currentHeadspaceController.getEmotion)
// .patch(usersController.updateUser)
// .delete(usersController.deleteUser)

// router.route('/get-med-info')
// .post(medsController.getMedInfo)

// router.route('/buy')
// .post(medsController.updateMeds)

module.exports = router