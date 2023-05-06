const mongoose = require('mongoose')

const presetQuoteSchema = new mongoose.Schema({

    presetQuote: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    emotion: {
        type: String,
        required: true,
    },
    secondary_emotion:{
        type: String,
        required: true,
    }
})


module.exports = mongoose.model('presetQuote', presetQuoteSchema)