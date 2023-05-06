const express = require('express')
const path = require('path')
const router = express.Router()
const presetDataController = require('../controllers/presetDataController')
router.route('/presetEmotions')
    .get(presetDataController.getPresetEmotions)

router.route('/presetQuotes')
    .get(presetDataController.getPresetQuotes)

module.exports = router