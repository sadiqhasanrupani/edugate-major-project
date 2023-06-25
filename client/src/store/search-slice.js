import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearchList: false,
};

const searchSlice = createSlice({
  initialState,
  name: "search",
  reducers: {
    openSearchList: (state, action) => {
      state.isSearchList = false;
    },
    closeSearchList: (state, action) => {
      state.isSearchList = true;
    },
  },
});

export const searchAction = searchSlice.actions;

export default searchSlice.reducer;
