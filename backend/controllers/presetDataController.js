import asyncHandler from 'express-async-handler';
import presetEmotion from '../models/presetEmotionModel.js';
import presetQuote from '../models/presetQuoteModel.js';

// @desc    Get all preset Emotions
// @route   Get /getPresetEmotions
// @access  Private
const getPresetEmotions = asyncHandler(async(req, res) => {
    const presetEmotionDB = await presetEmotion.findOne({}).select('-_id').exec();
    if(!presetEmotionDB) {
        return res.status(400).json({
            message: 'No preset emotions data found'
        })
    }
    else{
        // console.log(presetEmotionDB)
        res.json(presetEmotionDB)
    }
})

// @desc    Get all preset Emotions
// @route   Get /getPresetQuotes
// @access  Private
const getPresetQuotes = asyncHandler(async(req, res) => {
    const presetQuoteDB = await presetQuote.find({}).exec();
    if(!presetQuoteDB) {
        return res.status(400).json({
            message: 'No preset quote data found'
        })
    }
    else{
        res.json(presetQuoteDB)
    }
})

export {
    getPresetQuotes,
    getPresetEmotions,
}