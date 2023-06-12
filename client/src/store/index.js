import { configureStore } from "@reduxjs/toolkit";

//^ slices
import uiReducer from "./ui-slice";
import quizReducer from "./quiz-slice";
import classroomReducer from "./classroom-slice";

const store = configureStore({
  reducer: { ui: uiReducer, quiz: quizReducer, classroom: classroomReducer },
});

export default store;
