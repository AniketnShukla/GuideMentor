import  { createSlice } from '@reduxjs/toolkit';

//initalState checks localStorage
const initialState = {
    userCred: localStorage.getItem('userCred') ? JSON.parse(localStorage.getItem('userCred')) : null    
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userCred = action.payload;
            localStorage.setItem('userCred', JSON.stringify(state.userCred));
        },
        logout: (state, action) => {
            state.userCred = null;
            localStorage.removeItem('userCred');
        }
    }
})

//exporting actions
export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;