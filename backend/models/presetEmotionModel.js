import mongoose from 'mongoose';

const presetEmotionSchema = new mongoose.Schema({

    presetEmotions: [{
        type: String,
        required: true
    }],
})

const presetEmotion = mongoose.model('presetEmotion', presetEmotionSchema);

export default presetEmotion;