// const bcrypt  = require('bcrypt')
const fs = require('fs')
const path = require('path')
const asyncHandler = require('express-async-handler')
const Med = require('../models/Med')
const Customer = require('../models/Customer')


//@desc Get all users
//@route Get /users
//@access Private

const getMeds = asyncHandler(async(req, res) => {
    const meds = await Med.find().select('-messageAddress').lean()
    // console.log(meds)
    if(!meds) {
        return res.status(400).json({
            message: 'No medicines found'
        })
    }
    res.json(meds)
})

const getMedInfo = asyncHandler(async(req, res) => {
    const { medicineAddress } = req.body;
    console.log(req.body)
    const medicineInfo = await Med.find({
        'medicineAddress': medicineAddress,
    })      // console.log(meds)
    const medInfo = medicineInfo[0];
    if(!medInfo) {
        return res.status(400).json({
            message: 'No medicine found'
        })
    }
    res.json(medInfo)
})

//@desc Create new users
//@route POST /users
//@access Private
const addNewMed = asyncHandler(async(req, res) => {
    const {medicineAddress, 
        description, 
        quantity,
        price,
        rawMaterialAddress,
        fromAddresses,
        toAddresses,
        hash,
        previousHash,
        geoPoints,
        timestamps
     } = req.body
    console.log('works' + medicineAddress);

    const medObject = {
    'medicineAddress': medicineAddress,
    'description': description,
    'quantity': quantity,
    'price': price,
    'rawMaterialAddress': rawMaterialAddress,
    'fromAddresses': fromAddresses,
    'toAddresses': toAddresses,
    'hash': hash,
    'previousHash': previousHash,
    'geoPoints': geoPoints,
    'timestamps': timestamps,
    }

    //saving data in data folder **temporarily
    console.log('here')
    console.log(__dirname)
    console.log('here')
    // //Create and store new user
    const med = await Med.create(medObject)
    if(med){  //create
        console.log(med)
        res.status(201).json({message: `New medicine ${medicineAddress} created`})  
    }else{
        res.status(400).json({message: `Invalid medicine data received`})  
    }
})

const updateMeds = asyncHandler(async(req, res) => {
    const { cartObj } = req.body

    // let medAddrArray = []
    // for(let item in toBuyMeds){
    //     medAddrArray.push(item.medicineAddress);
    // }
    console.log('aaaaaaaaaaaaasassasaaaaaaaaaaaaaaaaa')
    console.log(cartObj)
    // toBuyMeds.map(async (item)=>{
    //     if(item){
    //         try{
                const med = await Med.findOne({
                    // 'medicineAddress': item.medicineAddress
                    'medicineAddress': cartObj.medicineAddress
                })
                if(!med) {
                    console.log('User Not Found')
                    return res.status(400).json({message: `User not found`})
                }
                // console.log(item)
                // console.log(med)
                med.quantity = med.quantity - cartObj.quantity
                const updatedMed = await med.save()
                // console.log(updatedMed)
                res.json({status: 'ok', message: `${updatedMed.description} updated`})

        // }
        // catch(e){
            // console.log(e);
        // }
        // }
    // })

    
    res.json({status: 'ok', message: `${updatedMed.username} updated`})
})


module.exports = {
    getMeds,
    getMedInfo,
    addNewMed,
    updateMeds,
    // updateUser,
    // deleteUser
}