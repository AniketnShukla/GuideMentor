import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stateReducer from '../features/emotion/currentStateSlice';
import quoteReducer from '../features/quote/quoteSlice'
import imageReducer from '../features/bgImage/imageSlice'
import emotionReducer from '../features/emotions/emotionsSlice'
import userDataReducer from '../features/userData/userDataSlice'
import sessionReducer from '../features/session/sessionSlice'

const reducer = combineReducers({
    stateReducer,
    quoteReducer,
    imageReducer,
    emotionReducer,
    userDataReducer,
    sessionReducer
})
export const store = configureStore({
    reducer 
})

