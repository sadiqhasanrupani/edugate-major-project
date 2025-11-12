import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//^ stylesheet
import styles from "../../../scss/components/models/alert-model.module.scss";

//^ slice actions
import { quizAction } from "../../../store/quiz-slice";

//^ components
import DeleteBtn from "../../../components/UI/Buttons/DeleteBtn/DeleteBtn.jsx";
import PrimaryBtn from "../../../components/UI/Buttons/PrimaryBtn";

const EditQuizAlert = ({ themeMode, quizName, startButtonPrompt = "Start Quiz", descritpionPrompt, onApprove }) => {
  const initialMessage = <p>
    Are you sure you want to take the <b>"{quizName}"</b> quiz?
  </p>

  const [message, setMessage] = useState(initialMessage)

  useEffect(() => {
    if (descritpionPrompt) {
      setMessage(descritpionPrompt)
    }
  }, [descritpionPrompt])

  //^ quiz global state.
  const openQuizEditModel = useSelector(
    (state) => state.quiz.openQuizEditModel
  );

  //^ dispatch method
  const dispatch = useDispatch();

  const approvalEditQuizHandler = (e) => {
    onApprove(e);
    dispatch(quizAction.teacherQuizEditModel());
  };

  const closeAskQuizHandler = () => {
    dispatch(quizAction.teacherQuizEditModel());
  };

  return (
    <div
      className={`${styles["student-ask-to-give-quiz"]} ${themeMode && styles.dark
        }`}
    >
      <p>
        {message}
      </p>

      <div className={styles["buttons"]}>
        <DeleteBtn onClick={closeAskQuizHandler}>Close</DeleteBtn>
        <PrimaryBtn
          className={styles["primary-card"]}
          onClick={approvalEditQuizHandler}
        >
          {startButtonPrompt}
        </PrimaryBtn>
      </div>
    </div>
  );
};

export default EditQuizAlert;
