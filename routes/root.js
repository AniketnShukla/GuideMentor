const { default: axios } = require('axios')
const express = require('express')
const asyncHandler = require('express-async-handler')
const fs = require('fs')
const path = require('path')
const router = express.Router()

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

router.get('/getMedData', (req, res) => {
    console.log('get request @ getmeddata')
    res.sendFile(path.join(__dirname, 'data', 'meds.json'))
})
// router.route('/').post(handlePost)

module.exports = router