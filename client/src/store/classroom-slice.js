import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isClassroomDeleted: false,
  classDelSuccessMsg: "",
};

const classroomSlice = createSlice({
  initialState: initialState,
  name: "classroom",
  reducers: {
    openClassroomDeletedMsg: (state, action) => {
      const { message } = action.payload;
      state.classDelSuccessMsg = message;

      state.isClassroomDeleted = true;
    },

    closeClassroomDeletedMsg: (state, action) => {
      state.classDelSuccessMsg = "";

      state.isClassroomDeleted = false;
    },
  },
});

export const classroomAction = classroomSlice.actions;

export default classroomSlice.reducer;
