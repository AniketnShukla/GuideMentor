import { createSlice } from '@reduxjs/toolkit'
import img2 from "/src/assets/UnregisteredAuthor/img2.jpg";
import img3 from "/src/assets/UnregisteredAuthor/img3.jpg";
import img39 from "/src/assets/UnregisteredAuthor/img39.jpg";
import img37 from "/src/assets/UnregisteredAuthor/img37.jpg";

const initialState = {
    image: img39,
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