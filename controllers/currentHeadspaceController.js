// const bcrypt  = require('bcrypt')
const fs = require('fs')
const path = require('path')
const asyncHandler = require('express-async-handler')
const CurrentHeadSpace = require('../models/CurrentHeadSpace')
const Quote = require('../models/Quote')

const getEmotion = asyncHandler(async(req, res) => {
    //get some better selection factor than "rage" please
    const emotionData = await CurrentHeadSpace.findOne().select().lean()
    // console.log(emotionData)
    if(!emotionData) {
        return res.status(400).json({
            message: 'No Emotion Data found'
        })
    }
    res.json(emotionData)
})
// //@desc Create new users
// //@route POST /users
// //@access Private
// const addNewRawMaterial = asyncHandler(async(req, res) => {
//     const {
//         rawMaterialAddress, 
//         description, 
//         quantity,
//         fromAddresses,
//         toAddresses,
//         hash,
//         previousHash,
//         geoPoints,
//         timestamps
//      } = req.body
//     console.log('works' + rawMaterialAddress);

//     const rawMaterialObject = {
//     'rawMaterialAddress': rawMaterialAddress,
//     'description': description,
//     'quantity': quantity,
//     'fromAddresses': fromAddresses,
//     'toAddresses': toAddresses,
//     'hash': hash,
//     'previousHash': previousHash,
//     'geoPoints': geoPoints,
//     'timestamps': timestamps,
//     }

//     console.log('__dirname: ' + __dirname)

//     // //Create and store new user
//     const rawMaterial = await RawMaterial.create(rawMaterialObject)
//     if(rawMaterial){  //create
//         console.log('Raw Material Address: ' + rawMaterial.rawMaterialAddress)
//         console.log(rawMaterial.timeAdded)
//         res.status(201).json({message: `New medicine ${rawMaterialAddress} created`})  
//     }else{
//         res.status(400).json({message: `Invalid material data received`})  
//     }
// })

module.exports = {
    getEmotion,
}