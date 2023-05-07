import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: ''
}

export const sessionSlice = createSlice({
    name: 'sessionUser',
    initialState,
    reducers: {
        setSessionUser: (state, action) => {
            state.userData = action.payload;
            // console.log('payload', action.payload)
        }
    }
})

export const {setSessionUser} = sessionSlice.actions;

export default sessionSlice.reducer;