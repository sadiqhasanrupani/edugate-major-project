import { createSlice } from "@reduxjs/toolkit";

const initialState = { isActive: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggler: (state) => {
      state.isActive = !state.isActive;
    },
  },
});

export const uiAction = uiSlice.actions;

export default uiSlice.reducer;