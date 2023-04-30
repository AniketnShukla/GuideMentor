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
        type: Number,
        required: true
    },

})

module.exports = mongoose.model('Quote', quoteSchema)