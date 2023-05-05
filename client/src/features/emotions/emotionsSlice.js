import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    emotions: []
}

export const emotionsSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserEmotions: (state, action) => {
            state.emotions = action.payload;
            // console.log('payload', action.payload)
        }
    }
})

export const {setUserEmotions} = emotionsSlice.actions;

export default emotionsSlice.reducer;