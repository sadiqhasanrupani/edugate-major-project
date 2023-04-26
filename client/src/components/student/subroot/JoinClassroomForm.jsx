//^ dependencies
import React from "react";
import { useSelector } from "react-redux";

//^ stylesheets
import styles from "../../../scss/components/student/subroot/JoinClassroomForm.module.scss";

//^ components
import JoinClassroomInput from "../../../components/UI/Input/SignupInput";
import PrimaryBtn from "../../UI/Buttons/PrimaryBtn";
import LoadingWheel from "../../UI/loading/LoadingWheel";

//^ icons
import AddUser from "../../UI/Icons/AddUser";

//^ custom hooks
import useInput from "../../../hooks/user-input";

//^ utils
import { isEmpty } from "../../../utils/validation";

const JoinClassroomForm = ({ classCode, errorMessage, isLoading }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //& addUser Input hook ===========================================================
  const {
    enteredValue: addUserEnteredValue,
    hasError: addUserHasError,
    isValid: addUserIsValid,
    onChangeHandler: addUserChangeHandler,
    onBlurHandler: addUserBlurHandler,
  } = useInput(isEmpty);

  //& ==============================================================================

  const formIsValid = addUserIsValid;

  classCode(addUserEnteredValue);

  return (
    <article className={`${styles["article"]} ${themeMode && styles["dark"]}`}>
      <div
        className={`${styles["add-user-input-div"]} ${
          addUserHasError && styles["is-valid"]
        } ${errorMessage && errorMessage.message && styles["is-valid"]}`}
      >
        <JoinClassroomInput
          className={styles["add-user-input"]}
          Icon={AddUser}
          type="password"
          placeholder={"Enter class-code"}
          defaultValue={addUserEnteredValue}
          onChange={addUserChangeHandler}
          onBlur={addUserBlurHandler}
        />
        <h6>
          {errorMessage && errorMessage.message
            ? errorMessage.message
            : "Enter valid class-code"}
        </h6>
      </div>
      <div className={styles["primary-div"]}>
        <PrimaryBtn type={"submit"} disabled={!formIsValid || isLoading}>
          {isLoading ? <LoadingWheel /> : "Join Classroom"}
        </PrimaryBtn>
      </div>
    </article>
  );
};

export default JoinClassroomForm;
