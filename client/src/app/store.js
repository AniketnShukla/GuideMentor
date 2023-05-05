import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stateReducer from '../features/emotion/currentStateSlice';
import quoteReducer from '../features/quote/quoteSlice'
import imageReducer from '../features/bgImage/imageSlice'
import emotionReducer from '../features/emotions/emotionsSlice'
import userDataReducer from '../features/userData/userDataSlice'

const reducer = combineReducers({
    stateReducer,
    quoteReducer,
    imageReducer,
    emotionReducer,
    userDataReducer
})
export const store = configureStore({
    reducer 
})

