import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    state: ''
}

export const stateSlice = createSlice({
    name: 'currentState',
    initialState,
    reducers: {
        setCurrentState: (state, action) => {
            state.state = action.payload;
            // console.log('payload', action.payload)
        },
        reset: (state) => {
            state.state = '';
        }
    }
})

export const {setCurrentState, reset} = stateSlice.actions;

export default stateSlice.reducer;