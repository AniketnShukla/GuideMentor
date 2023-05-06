// const bcrypt  = require('bcrypt')
const fs = require('fs')
const path = require('path')
const asyncHandler = require('express-async-handler')
const presetEmotion = require('../models/presetEmotion')
const presetQuote = require('../models/presetQuote')

//@desc Get all users
//@route Get /users
//@access Private

// const getAllusers = asyncHandler(async(req, res) => {
//     const users = await user.find().select('-password').lean()
//     if(!users) {
//         return res.status(400).json({
//             message: 'No users found'
//         })
//     }
//     res.json(users)
// })
const getPresetEmotions = asyncHandler(async(req, res) => {
    // const { currentUser } = req.body 
    // console.log(currentUser);
    // const users = await user.find().select('-password').lean()
    const presetEmotionDB = await presetEmotion.findOne({}).exec();
    if(!presetEmotionDB) {
        return res.status(400).json({
            message: 'No preset emotions data found'
        })
    }
    else{
        console.log(presetEmotionDB)
        res.json(presetEmotionDB)
    }
})
const getPresetQuotes = asyncHandler(async(req, res) => {
    // const { currentUser } = req.body 
    // console.log(currentUser);
    // const users = await user.find().select('-password').lean()
    const presetQuoteDB = await presetQuote.find({}).exec();
    if(!presetQuoteDB) {
        return res.status(400).json({
            message: 'No preset quote data found'
        })
    }
    else{
        // console.log(presetQuoteDB)
        console.log('preset Quotes promise true eh')
        res.json(presetQuoteDB)
    }
})
 
module.exports = {
    getPresetQuotes,
    getPresetEmotions,
}