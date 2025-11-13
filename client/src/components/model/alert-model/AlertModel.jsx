import { useEffect, useState } from "react";

//^ stylesheet
import styles from "../../../scss/components/models/alert-model.module.scss";

//^ components
import DeleteBtn from "../../../components/UI/Buttons/DeleteBtn/DeleteBtn.jsx";
import PrimaryBtn from "../../../components/UI/Buttons/PrimaryBtn";

const AlertModel = ({
  themeMode,
  startButtonPrompt = "Start Quiz",
  messagePrompt,
  onApprove,
  onCloseModel
}) => {
  const [message, setMessage] = useState(messagePrompt)

  useEffect(() => {
    if (messagePrompt) {
      setMessage(messagePrompt)
    }
  }, [messagePrompt])

  const approvalEditQuizHandler = (e) => {
    onApprove(e);
  };

  const closeAskQuizHandler = (e) => {
    onCloseModel(e)
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

export default AlertModel;
