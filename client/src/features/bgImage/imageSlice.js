import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    image: '',
    freezeBackground: false
}

export const imageSlice = createSlice({
    name: 'imageSlice',
    initialState,
    reducers: {
        setImage: (state, action) => {
            state.image = action.payload;
            // console.log('payload', action.payload)
        },
        setFreezeBackground: (state, action) => {
            state.freezeBackground = action.payload
            console.log(state.freezeBackground)
        },
        reset: (state) => {
            state.state = '';
        }
    }
})

export const {setImage, setFreezeBackground, reset} = imageSlice.actions;

export default imageSlice.reducer;