import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
  isDarkMode: false,
  isCompulsorySubjectFormActive: false,
  isJoinClassroomActive: false,
  isViewImageActive: false,
  isTeacherInviteFormActive: false,
  isCreateAssignmentActive: false,
  isStudentJoinClassroomActive: false,
  isTeacherOverlayActive: false,
  isStudentOverlayActive: false,
  isOptionalSubjectFormActive: false,
  isOptionalSubjectOverlayActive: false,
  isSuccessfullyJoinOptionalSub: false,
  isSuccessfullyUpdateProfileStudent: false,
  isSuccessSubmissionAssignment: false,
  isErrorSubmissionAssignment: false,
  isQuizCreated: false,
  quizSuccessResponseData: "",
  isQuizUpdated: false,
  quizUpdateSuccessResData: "",
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
    compulsorySubjectFormHandler: (state) => {
      state.isCompulsorySubjectFormActive =
        !state.isCompulsorySubjectFormActive;
    },
    optionalSubjectFormHandler: (state) => {
      state.isOptionalSubjectFormActive = !state.isOptionalSubjectFormActive;
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
    TogglerAddTeacherOverlay: (state) => {
      state.isTeacherOverlayActive = !state.isTeacherOverlayActive;
    },
    TogglerAddStudentOverlay: (state) => {
      state.isStudentOverlayActive = !state.isStudentOverlayActive;
    },
    togglerOptionalSubjectOverlay: (state) => {
      state.isOptionalSubjectOverlayActive =
        !state.isOptionalSubjectOverlayActive;
    },
    successfullyJoinOptionalSubMessage: (state) => {
      state.isSuccessfullyJoinOptionalSub =
        !state.isSuccessfullyJoinOptionalSub;
    },
    closeSuccessfullyJoinOptionalSubMessage: (state) => {
      state.isSuccessfullyJoinOptionalSub = false;
    },
    successfullyUpdateProfileStudent: (state) => {
      state.isSuccessfullyUpdateProfileStudent =
        !state.isSuccessfullyUpdateProfileStudent;
    },
    closeSuccessfullyUpdateProfileStudent: (state) => {
      state.isSuccessfullyUpdateProfileStudent = false;
    },
    openSuccessfullyUpdateProfileStudent: (state) => {
      state.isSuccessfullyUpdateProfileStudent = true;
    },
    openSuccessSubmissionAssignment: (state) => {
      state.isSuccessSubmissionAssignment = true;
    },
    closeSuccessSubmissionAssignment: (state) => {
      state.isSuccessSubmissionAssignment = false;
    },
    openErrorSubmissionAssignment: (state) => {
      state.isErrorSubmissionAssignment = true;
    },
    closeErrorSubmissionAssignment: (state) => {
      state.isErrorSubmissionAssignment = false;
    },
    openQuizSuccessMessage: (state, action) => {
      state.quizSuccessResponseData = action.payload;

      state.isQuizCreated = true;
    },
    closeQuizSuccessMessage: (state) => {
      state.quizSuccessResponseData = "";

      state.isQuizCreated = false;
    },
    openQuizUpdateSuccessMsg: (state, action) => {
      state.quizUpdateSuccessResData = action.payload;

      state.isQuizUpdated = true;
    },
    closeQuizUpdateSuccessMsg: (state) => {
      state.quizUpdateSuccessResData = "";

      state.isQuizUpdated = false;
    },
  },
});

export const uiAction = uiSlice.actions;

export default uiSlice.reducer;
