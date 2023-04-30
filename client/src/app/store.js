import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stateReducer from '../features/emotion/currentStateSlice';
import quoteReducer from '../features/quote/quoteSlice'

const reducer = combineReducers({
    stateReducer,
    quoteReducer,
})
export const store = configureStore({
    reducer,
})

