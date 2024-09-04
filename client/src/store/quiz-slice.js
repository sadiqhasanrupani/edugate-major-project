import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isStudentAlreadyGivenQuiz: false,
  isStudentAskQuizModel: false,
  isStudentQuizSubmitted: false,
  studentNavigateToQuiz: ``,
  quizName: "",
  studentQuizSubmitMsg: ``,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState: initialState,
  reducers: {
    studentAlreadyGivenQuiz: (state, action) => {},
    askStudentToGiveQuiz: (state, action) => {
      const { quizName, navigateToQuiz } = action.payload;

      state.isStudentAskQuizModel = true;
      state.studentNavigateToQuiz = navigateToQuiz;
      state.quizName = quizName;
    },
    studentDontWantToGiveQuiz: (state, action) => {
      state.isStudentAskQuizModel = false;
      state.studentNavigateToQuiz = "";
      state.quizName = "";
    },
    studentCloseAskQuizModel: (state, action) => {
      state.isStudentAskQuizModel = false;
      state.studentNavigateToQuiz = "";
      state.quizName = "";
    },
    studentOpenQuizSubmittedModelHandler: (state, action) => {
      const { responseMsg } = action.payload;

      state.isStudentQuizSubmitted = true;
      state.studentQuizSubmitMsg = responseMsg;
    },
    studentCloseQuizSubmittedModelHandler: (state) => {
      state.isStudentQuizSubmitted = false;
      state.studentQuizSubmitMsg = "";
    },
  },
});

export const quizAction = quizSlice.actions;

export default quizSlice.reducer;
