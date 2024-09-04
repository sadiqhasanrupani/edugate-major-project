import React from "react";

//^ styles
import styles from "./QuizForStudent.module.scss";

//^ components
import QuizHeading from "./quiz-heading/QuizHeading";
import UnderLine from "../../../../../UI/underline/UnderLine";
import StudentQuizQuestions from "../../../../../student/subject/subroot/quiz/student-quiz-question/StudentQuizQuestion";

const QuizForStudent = ({
  quizData,
  themeMode,
  onSelectAnswer,
  submitInCompleteQuiz,
}) => {
  return (
    <article className={`${styles.article} ${themeMode && styles.dark}`}>
      <QuizHeading
        quizTitle={quizData.quiz.title}
        quizDuration={quizData.quiz.duration}
        quizTotalMarks={quizData.quiz.total_marks}
        themeMode={themeMode}
        submitInCompleteQuiz={submitInCompleteQuiz}
      />
      <UnderLine className={styles.underline} themeMode={themeMode} />
      <StudentQuizQuestions
        questionQuestions={quizData.quiz.questions}
        questionTotalMarks={quizData.quiz.total_marks}
        themeMode={themeMode}
        onSelectAnswer={onSelectAnswer} // Pass the onSelectAnswer function to StudentQuizQuestions
      />
    </article>
  );
};

export default QuizForStudent;
