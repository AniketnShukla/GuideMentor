import { default as axios }  from 'axios'
import express  from 'express'
import asyncHandler  from 'express-async-handler'
import fs  from 'fs'
import path  from 'path'


const router = express.Router();

router.get('^/$|/index(.html)?', (req, res) => {
    const __dirname = path.resolve();
    res.sendFile(path.join(__dirname, 'backend', 'views', 'index.html'))
})

router.get('/getMedData', (req, res) => {
    console.log('get request @ getmeddata')
    res.sendFile(path.join(__dirname, 'data', 'meds.json'))
})


export default router