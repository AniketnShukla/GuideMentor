import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: {}
}

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            // console.log('payload', action.payload)
        }
    }
})

export const {setUserData} = userDataSlice.actions;

export default userDataSlice.reducer;