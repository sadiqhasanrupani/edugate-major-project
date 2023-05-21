import React, { Fragment, useState } from "react";

//^ styles
import styles from "./QuizQuestion.module.scss";

//^ component
import QuestionCard from "./QuestionCard/QuestionCard.jsx";
import PrimaryBtn from "../UI/Buttons/PrimaryBtn";

const QuizQuestion = ({ themeMode, marks }) => {
  const [questionData, setQuestionData] = useState([]);

  const updateQuestionData = (index, data) => {
    setQuestionData((prevQuestionData) => {
      const updatedQuestionData = [...prevQuestionData];
      updatedQuestionData[index] = data;
      return updatedQuestionData;
    });
  };

  const deleteQuestion = (index) => {
    setQuestionData((prevQuestionData) => {
      const updatedQuestionData = [...prevQuestionData];
      updatedQuestionData.splice(index, 1);
      return updatedQuestionData;
    });
  };

  const addQuestion = () => {
    setQuestionData((prevQuestionData) => [
      ...prevQuestionData,
      {
        /* initial question data */
      },
    ]);
  };

  console.log(questionData);

  return (
    <div className={styles['quiz-question']}>
      {questionData.map((question, index) => (
        <Fragment key={index}>
          <QuestionCard
            themeMode={themeMode}
            marks={marks}
            onUpdateQuestionData={(data) => updateQuestionData(index, data)}
            onDeleteQuestion={() => deleteQuestion(index)}
          />
        </Fragment>
      ))}

      <div className={styles['add-question-btn']}>
        <PrimaryBtn onClick={addQuestion}>Add Question</PrimaryBtn>
      </div>
    </div>
  );
};

export default QuizQuestion;
