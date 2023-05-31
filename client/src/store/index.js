import { configureStore } from "@reduxjs/toolkit";

//^ slices
import uiReducer from "./ui-slice";
import quizReducer from "./quiz-slice";

const store = configureStore({
  reducer: { ui: uiReducer, quiz: quizReducer },
});

export default store;
