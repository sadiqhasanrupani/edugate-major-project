import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
  isDarkMode: false,
  isSubjectFormActive: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggler: (state) => {
      state.isActive = !state.isActive;
    },
    themeToggler: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    SubjectFormHandler: (state) => {
      state.isSubjectFormActive = !state.isSubjectFormActive;
    },
  },
});

export const uiAction = uiSlice.actions;

export default uiSlice.reducer;
