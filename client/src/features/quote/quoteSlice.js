import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     quote: '',
     author: '',
}

const quoteSlice = createSlice({
    name: 'Nameisquote',
    initialState,
    reducers: {
        setQuote: (state, action) => {
            state.quote = action.payload.stateQuote
            state.author = action.payload.stateAuthor
            // console.log(action.payload.stateQuote)
            // console.log(action.payload.stateAuthor)
        }
    }
})

export const { setQuote } = quoteSlice.actions;
export default quoteSlice.reducer;
