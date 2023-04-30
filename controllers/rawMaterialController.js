// const bcrypt  = require('bcrypt')
const fs = require('fs')
const path = require('path')
const asyncHandler = require('express-async-handler')
const Med = require('../models/Med')
const Customer = require('../models/Customer')
const RawMaterial = require('../models/RawMaterial')


const getMaterialInfo = asyncHandler(async(req, res) => {
    const { rawMaterialAddress } = req.body;
    console.log(req.body)
    const materialInfo = await RawMaterial.find({
        'rawMaterialAddress': rawMaterialAddress,
    })      // console.log(meds)
    if(!materialInfo) {
        return res.status(400).json({
            message: 'No medicine found'
        })
    }
    const material = materialInfo[0];
    res.json({material: material, status: 'ok' })

})

//@desc Create new users
//@route POST /users
//@access Private
const addNewRawMaterial = asyncHandler(async(req, res) => {
    const {
        rawMaterialAddress, 
        description, 
        quantity,
        fromAddresses,
        toAddresses,
        hash,
        previousHash,
        geoPoints,
        timestamps
     } = req.body
    console.log('works' + rawMaterialAddress);

    const rawMaterialObject = {
    'rawMaterialAddress': rawMaterialAddress,
    'description': description,
    'quantity': quantity,
    'fromAddresses': fromAddresses,
    'toAddresses': toAddresses,
    'hash': hash,
    'previousHash': previousHash,
    'geoPoints': geoPoints,
    'timestamps': timestamps,
    }

    console.log('__dirname: ' + __dirname)

    // //Create and store new user
    const rawMaterial = await RawMaterial.create(rawMaterialObject)
    if(rawMaterial){  //create
        console.log('Raw Material Address: ' + rawMaterial.rawMaterialAddress)
        console.log(rawMaterial.timeAdded)
        res.status(201).json({message: `New medicine ${rawMaterialAddress} created`})  
    }else{
        res.status(400).json({message: `Invalid material data received`})  
    }
})

module.exports = {
    addNewRawMaterial,
    getMaterialInfo
}