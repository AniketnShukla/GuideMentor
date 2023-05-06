// const bcrypt  = require('bcrypt')
const fs = require('fs')
const path = require('path')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const Med = require('../models/Med')
const jwt = require('jsonwebtoken')  

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
const getUserEmotions = asyncHandler(async(req, res) => {
    const { currentUser } = req.body 
    // console.log(currentUser);
    // const users = await user.find().select('-password').lean()
    const userDB = await User.findOne({
        'username': currentUser,
    }).select('-password')
    if(!userDB) {
        return res.status(400).json({
            message: 'No user found'
        })
    }
    else{
        // console.log(userDB)
        res.json(userDB)
    }
})

const saveQuote = asyncHandler(async(req, res) => {
    const {currentUser, quote, author, emotion} = req.body;
    console.log(quote, author, emotion)
    const quoteObject = {
    'quote': quote,
    'author': author,
    'emotion': emotion,
    }
    const userDB = await User.findOne({
        username: currentUser
    }) 
    if(!userDB){
        console.log('User not found')
        res.status(400).json({message: 'User does not exist'})  
    }
    if(!userDB.emotionData.includes(emotion)){
        userDB.emotionData.push(emotion);
    }
    userDB.quoteData.push(quoteObject);
    console.log(userDB)
    const upatedUser = await userDB.save();
    res.status(201).json({status: 'ok'})  
})

// //@desc Get all orders
// //@route Post /getAllOrders
// //@access Private

// const getAllOrders = asyncHandler(async(req, res) => {
//     // const username = req.params
//     const { username } = req.body
//     const user = await user.findOne({
//         'username': username,
//     })   
//      if(!user) {
//         return res.status(400).json({
//             message: 'No users found'
//         })
//     }
//     else{
//         const allOrders = user.ordersPlaced;
//         console.log(allOrders)
//         res.json(allOrders)
//     }
// })

//@desc Create new users
//@route POST /users
//@access Private
const createNewUser = asyncHandler(async(req, res) => {
    const {
        name, 
        email, 
        password,
     } = req.body
    console.log('works ' + email);

    // return res.status(400).json(req.body)
    //COnfirm data
    // if(!username || !password || !Array.isArray(roles) || !roles.length){
    //     return res.status(400).json({message: 'All fields are required'})
    // }
    // Check for duplicates
    const duplicateUserName = await User.findOne({username: name}).lean().exec()
    if(duplicateUserName){
        console.log('dupli')
        return res.json({message: 'Duplicate username'})
    }
    const duplicateEmail  = await User.findOne({email: email}).lean().exec()
    if(duplicateEmail){
        console.log('dupli')
        return res.json({message: 'Email already in use'})
    }

    // const hashedPwd = await bcrypt.hash(password, 10) //salt rounds
    // const hashedPwd = await bcrypt.hash(password, 10) //salt rounds
    const userObject = {
        'username': name,
        'email': email,
        //use bcypt 
        'password': password,
    }

    //saving data in data folder **temporarily
    console.log('here')
    console.log(req.body)
    console.log(userObject)
    console.log('here')
//  COnfirm data
//name should be username
//samename can be used this way or wot brain 404
    if(!name || !password ){
        return res.status(400).json({message: 'All fields are required'})
    }
    // const userObject = {username, "password": hashedPwd, roles}
    // //Create and store new user
    const user = await User.create(userObject)
    if(user){  //create
        // console.log(userObject)
        return res.json({status: 'ok', user: name, message: 'User Registered'})
        // res.status(201).json({message: `New User ${name} created`})  
    }else{
        res.status(400).json({message: `Invalid user data received`})  
    }
})

//@desc Placing an Order
//@route Patch /users
//@access Private
// const placeOrder = asyncHandler(async(req, res) => {
//     // const { username, toBuyMeds, quantity } = req.body
//     const { username, toBuyMeds } = req.body
//     //COnfirm data
//     // if( !username || !medicineAddress ){
//     //     res.status(400).json({message: `All fields are required`})  
//     // }
    
//     const user = await user.find({
//         'username': username
//     })
//     // let medAddrArray = []
//     // for(let item in toBuyMeds){
//     //     medAddrArray.push(item.medicineAddress);
//     // }
//     // console.log('aaaaaaaaaaaaasassasaaaaaaaaaaaaaaaaa')
//     // console.log(toBuyMeds)
//     // toBuyMeds.map(async (item)=>{
//     //     if(item){
//     //         try{
//     //             const med = await Med.findOne({
//     //                 'medicineAddress': item.medicineAddress
//     //             })
//     //             console.log(item)
//     //             // console.log(med)
//     //             med[quantity] = med[quantity] - item[quantity]
//     //             const updateMed = await med.save()
//     //             console.log(updateMed)
//     //     }
//     //     catch(e){
//     //         console.log(e);
//     //     }
//     //     }
//     // })

//     console.log('User Email: ' + user[0].email)
//     if(!user) {
//         console.log('User Not Found')
//         return res.status(400).json({message: `User not found`})
//     }
//     //Update the user order information
//     userOrders = user[0].ordersPlaced
//     const orderArray = [];
//     toBuyMeds.map((med) => {
//         const orderObject = {
//         'medicineAddress': med.medicineAddress,
//         'quantity': med.quantity
//         }
//         orderArray.push(orderObject);
//     })
//     // console.log('Earliest Order Product ID: ' + user[0].ordersPlaced[0].medicineAddress)
//     userOrders.push.apply(userOrders, orderArray)
//     user[0].ordersPlaced = userOrders
//     // console.log(userOrders)
    // const updatedUser = await user[0].save()
    
//     res.json({status: 'ok', message: `${updatedUser.username} updated`})
// })

// @desc Update a users
// @route PATCH /users
// @access Private
const loginUser = asyncHandler(async(req, res) => {
    const { name, password } = req.body;
    // const userObject = {
    //     'username': username,
    //     //use bcypt 
    //     'password': password,
    // }

    //checking if name is email or password ********Important, Don't Delete
    //email or user login
    // const userDB = User.findOne({
    //     $or:[
    //         {username: name},
    //         {email: name}
    //     ],
    //     password: password
    // })
    const userDB = User.findOne({
        username: name
    })

    // console.log(userDB);
    if(userDB){
    //     const token = jwt.sign({
    //         username: user.username,
    //         password: user.password
    //     }, 'secret123')
        return res.json({status: 'ok', username: name})
    }
    else{
        return res.json({status: 'error', user: false})
    }
})

//@desc Deleta a users
//@route DELETE /users
//@access Private

// const deleteUser = asyncHandler(async(req, res) => {

//     const { id } = req.body
//     if(!id){
//     return res.status(400).json({message: `User ID required`})
//     }
//     const notes = await Note.findOne({ user: id }).lean().exec()
//     if(notes?.length) {
//         return res.status(400).json({message: `User has assinged notes`})
//     }
//     const user = await User.findById(id).exec()
//     if(!user){
//         return res.status(400).json({message: `User not found`})
//     }
//     const result = await deleteOne()
//     const reply = `Username ${result.username} with ID ${result._id} deleted`

//     res.json(reply)
//  })
 
module.exports = {
    createNewUser,
    getUserEmotions,
    loginUser,
    saveQuote
}