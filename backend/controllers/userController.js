// const bcrypt  = require('bcrypt')
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// @desc    Get /user Emotions
// @route   Get /all-data
// @access  Private
const getUserData = asyncHandler(async(req, res) => {
    const { currentUser } = req.body 
    const userDB = await User.findOne({
        'username': currentUser,
    }).select('-password')
    if(!userDB) {
        return res.status(400).json({
            message: 'No user found'
        })
    }
    else{
        res.json(userDB)
    }
})

// @desc    Get /user Emotions
// @route   Get /emotion-data
// @access  Private
const getEmotionData = asyncHandler(async(req, res) => {
    const { currentUser } = req.body 
    const userDB = await User.findOne({
        'username': currentUser,
    }).select('-password')
    if(!userDB) {
        return res.status(400)
        throw new Error( 'No user found');
    }
    else{
        // console.log(userDB) 
        res.json(userDB.emotionData)
    }
})

// @desc    POST /user Quotes
// @route   Get /quote
// @access  Private
const saveQuote = asyncHandler(async(req, res) => {
    const {currentUser, quote, author, emotion} = req.body;
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
        res.status(400)
        throw new Error('User does not exist');  
    }
    if(!userDB.emotionData.includes(emotion)){
        userDB.emotionData.push(emotion);
    }
    userDB.quoteData.push(quoteObject);
    const upatedUser = await userDB.save();
    res.status(201).json({status: 'ok'})  
})


//@desc Create new users
//@route POST /users
//@access Private
const createNewUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({email});
    if ( userExists ) {
        res.status(400);
        throw new Error (`User Already Exists`)
    }
    const usernameExists = await User.findOne({username: name});
    if(usernameExists){
        throw new Error (`Username Taken`);
    }
    const user = await User.create({
        username: name,
        email: email,
        password: password
    });
    if(user){  //create
        generateToken(res, user._id);
        return res.status(201).json({
            _id: user._id,
            name: name,
            email: email 
        });
    }else{
        res.status(400);
        throw new Error(`Invalid user data received`);
    }
});

// @desc Update a users
// @route PATCH /users
// @access Private
const authUser = asyncHandler(async(req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({username: name});
    // console.log(user);
    if (user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.username,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
})

// @desc Logout User
// @route PATCH /logout
// @access Private
const logoutUser = asyncHandler( async (req, res) => {
    try {
        req.session.cookie.expires = new Date(0);
        req.logout();
        console.log(req.session);
        res.cookie('jwt', '', {
            httpOnly: true,
            expire: new Date(0),
        });
        res.status(200).json({ message: 'User Logged Out' });
    } catch (err) {
        res.status(500).json({message: 'Error logging out'});
    }
});

// @desc Site Health
// @route  /healthz
// @access Public
const siteHealth =  (req, res) => {
        res.status(200).send('OK');
}

export {
    createNewUser,
    getUserData,
    getEmotionData,
    authUser,
    saveQuote,
    logoutUser,
    siteHealth
}