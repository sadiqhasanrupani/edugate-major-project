import { configureStore } from "@reduxjs/toolkit";

//^ slices
import uiReducer from "./ui-slice";
import quizReducer from "./quiz-slice";
import classroomReducer from "./classroom-slice";
import searchReducer from "./search-slice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    quiz: quizReducer,
    classroom: classroomReducer,
    search: searchReducer,
  },
});

export default store;
