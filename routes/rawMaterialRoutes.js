const express = require('express')
const path = require('path')
const router = express.Router()
const rawMaterialController = require('../controllers/rawMaterialController')
router.route('/')
.post(rawMaterialController.addNewRawMaterial)
// .get(rawMaterialController.getMeds)
// .patch(usersController.updateUser)
// .delete(usersController.deleteUser)

router.route('/get-raw-material')
.post(rawMaterialController.getMaterialInfo)

module.exports = router