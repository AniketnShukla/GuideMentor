import express  from 'express';
const router = express.Router();
import {
    getPresetEmotions,
    getPresetQuotes
}  from '../controllers/presetDataController.js';

// baseURL: /preset
router.route('/presetEmotions')
    .get(getPresetEmotions)

router.route('/presetQuotes')
    .get(getPresetQuotes)

export default router;