const mongoose = require('mongoose')

const presetEmotionSchema = new mongoose.Schema({

    presetEmotions: [{
        type: String,
        required: true
    }],
})
module.exports = mongoose.model('presetEmotion', presetEmotionSchema)