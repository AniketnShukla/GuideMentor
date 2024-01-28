import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import { combineReducers } from "@reduxjs/toolkit";
import stateReducer from './features/emotion/currentStateSlice';
import quoteReducer from './features/quote/quoteSlice'
import imageReducer from './features/bgImage/imageSlice'
import emotionReducer from './features/emotions/emotionsSlice'
import userDataReducer from './features/userData/userDataSlice'
import sessionReducer from './features/session/sessionSlice'

const reducer = combineReducers({
    stateReducer,
    emotionReducer,
    sessionReducer
})
const store = configureStore({
    reducer: {
        auth: authReducer,
        quote: quoteReducer,
        image: imageReducer,
        userData: userDataReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        reducer,
    },
    middleware: (getDefaultmiddleware) => 
        getDefaultmiddleware().concat(apiSlice.middleware),
        devTools: true,
});
export default store;