import React, { Fragment, useEffect, useState } from "react";
import QuestionCard from "./QuestionCard/QuestionCard.jsx";
import PrimaryBtn from "../UI/Buttons/PrimaryBtn";

import styles from "./QuizQuestion.module.scss";

const QuizQuestion = ({
  themeMode,
  marks,
  onQuizQuestion,
  quizQuestionData,
}) => {
  const [questionData, setQuestionData] = useState(
    quizQuestionData ? quizQuestionData : [ {
      question: "",
      choices: ["", "", "", ""],
      selectedChoice: "",
    }]
  );

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

  const addQuestion = (e) => {
    e.preventDefault();
    setQuestionData((prevQuestionData) => [
      ...prevQuestionData,
      {
        question: "",
        choices: ["", "", "", ""],
        selectedChoice: "",
      },
    ]);
  };

  const getUpdatedChoiceInputData = (index, choiceData) => {
    setQuestionData((prevQuestionData) => {
      const updatedQuestionData = [...prevQuestionData];
      const question = { ...updatedQuestionData[index] };
      question.choices = choiceData.choices;
      question.selectedChoice = choiceData.selectedChoice;
      updatedQuestionData[index] = question;
      return updatedQuestionData;
    });
  };

  useEffect(() => {
    onQuizQuestion(questionData);
  }, [onQuizQuestion, questionData]);

  return (
    <div className={styles["quiz-question"]}>
      {questionData.map((question, index) => {
        return (
          <Fragment key={index}>
            <QuestionCard
              themeMode={themeMode}
              marks={marks}
              question={question}
              onUpdateQuestionData={(data) => updateQuestionData(index, data)}
              onDeleteQuestion={() => deleteQuestion(index)}
              onUpdateChoiceInputData={(choiceData) =>
                getUpdatedChoiceInputData(index, choiceData)
              }
            />
          </Fragment>
        );
      })}
      <div className={styles["add-question-btn"]}>
        <PrimaryBtn onClick={addQuestion}>Add Question</PrimaryBtn>
      </div>
    </div>
  );
};

export default QuizQuestion;
