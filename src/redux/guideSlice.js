// guideSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const guideSlice = createSlice({
  name: 'guide',
  initialState: [],
  reducers: {
    setGuides: (state, action) => {
      return action.payload; // Assuming action.payload is an array
    },
    addGuide: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setGuides, addGuide } = guideSlice.actions;

export default guideSlice.reducer;
