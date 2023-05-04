const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({

    quote: {
        type: String,
        required: true
    },
    emotion: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
})
const emotionSchema = new mongoose.Schema({

    emotions:{
        type: [String],
    },
})


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    quoteData: [{
        type: quoteSchema,
        required: true
    }],
    
    emotionData: [{
        type: String,
        required: true
    }],
    timeUpdated: {
        type : Date, 
        default: Date.now, 
        required: true,
    }
    // roles: [{
    //     type: String,
    //     default: "Employee"
    // }],
    // active: {
    //     type: Boolean,
    //     default:true
    // }
    
    //Updated or added?
})

module.exports = mongoose.model('user', userSchema)