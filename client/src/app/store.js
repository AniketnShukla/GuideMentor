import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stateReducer from '../features/emotion/currentStateSlice';
import quoteReducer from '../features/quote/quoteSlice'
import imageReducer from '../features/bgImage/imageSlice'

const reducer = combineReducers({
    stateReducer,
    quoteReducer,
    imageReducer,
})
export const store = configureStore({
    reducer,
})

