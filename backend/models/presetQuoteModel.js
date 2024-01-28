import mongoose from 'mongoose';

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

const presetQuote = mongoose.model('presetQuote', presetQuoteSchema);

export default presetQuote;