import React, { useEffect, useState } from "react";

import styles from "./QuizCard.module.scss";

//^ auth
import { getAuthToken } from "../../../../../../utils/auth";

//^ component
import SecondaryCard from "../../../../../UI/Card/CardSecondary";
import QuizHead from "./QuizHead/QuizHead";
import QuizFooter from "./QuizFooter/QuizFooter"
import LoadingBar from "../../../../../UI/loading/LoadingBar/LoadingBar";

const QuizCard = ({
  themeMode,
  quizTitle,
  subjectName,
  classroomName,
  quizId,
}) => {
  const [joinSubQuizzesData, setJoinSubQuizzesData] = useState(null);

  useEffect(() => {
    const getJoinAndSubmittedQuizzesLength = async () => {
      const JoinSubQuizzesLen = await fetch(
        `${process.env.REACT_APP_HOSTED_URL}/quiz/get-join-submitted-quizzes-length/${quizId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      const response = await JoinSubQuizzesLen.json();

      setJoinSubQuizzesData(response);
    };

    getJoinAndSubmittedQuizzesLength();
  }, []);

  let percentage = 0;

  if (joinSubQuizzesData) {
    const { submittedQuizzesLen, joinQuizzesLen } = joinSubQuizzesData;

    const totalCount = joinQuizzesLen;

    const count = submittedQuizzesLen;

    percentage = totalCount !== 0 ? (count / totalCount) * 100 : 0;
  }

  return (
    <div className={`${styles["quiz-card"]} ${themeMode && styles.dark}`}>
      <SecondaryCard className={styles["secondary-card"]}>
        <QuizHead
          classroomName={classroomName}
          quizTitle={quizTitle}
          subjectName={subjectName}
          quizId={quizId}
          themeMode={themeMode}
        />
        <LoadingBar progress={percentage.toFixed(1)} />
        <QuizFooter themeMode={themeMode} quizId={quizId} />
      </SecondaryCard>
    </div>
  );
};

export default QuizCard;
