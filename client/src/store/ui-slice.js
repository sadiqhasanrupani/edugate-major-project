import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
  isDarkMode: false,
  isSubjectFormActive: false,
  isJoinClassroomActive: false,
  isViewImageActive: false,
  isTeacherInviteFormActive: false,
  isCreateAssignmentActive: false,
  isStudentJoinClassroomActive: false,
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
    joinClassroomFormHandler: (state) => {
      state.isJoinClassroomActive = !state.isJoinClassroomActive;
    },
    viewImageTogglerHandler: (state) => {
      state.isViewImageActive = !state.isViewImageActive;
    },
    viewTeacherInviteFormToggler: (state) => {
      state.isTeacherInviteFormActive = !state.isTeacherInviteFormActive;
    },
    ToggleCreateAssignment: (state) => {
      state.isCreateAssignmentActive = !state.isCreateAssignmentActive;
    },
    ToggleStudentJoinClassroom: (state) => {
      state.isStudentJoinClassroomActive = !state.isStudentJoinClassroomActive;
    },
  },
});

export const uiAction = uiSlice.actions;

export default uiSlice.reducer;
