import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enabled: false,
};

const mentorSlice = createSlice({
  name: 'mentor',
  initialState,
  reducers: {
    toggleMentor: (state) => {
      state.enabled = !state.enabled;
    },
    setMentor: (state, action) => {
      state.enabled = !!action.payload;
    },
  },
});

export const { toggleMentor, setMentor } = mentorSlice.actions;
export default mentorSlice.reducer;
