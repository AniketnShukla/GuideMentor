import express  from 'express';
const router = express.Router();
import {
    createNewUser,
    authUser,
    getUserData,
    getEmotionData,
    saveQuote,
    logoutUser
}  from '../controllers/userController.js';
// import { protect } from '../middleware/authMiddleware.js';

//baseURL: /user
router.post('/signup', createNewUser)
router.post('/login', authUser)
router.post('/all-data', (getUserData));
router.post('/emotion-data', (getEmotionData));
router.post('/quote', saveQuote);
router.post('/logout', logoutUser)


export default router;