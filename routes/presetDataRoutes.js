const express = require('express')
const path = require('path')
const router = express.Router()
const presetDataController = require('../controllers/presetDataController')
router.route('/presetEmotions')
    .post(presetDataController.getPresetEmotions)

router.route('/presetQuotes')
    .post(presetDataController.getPresetQuotes)

module.exports = router