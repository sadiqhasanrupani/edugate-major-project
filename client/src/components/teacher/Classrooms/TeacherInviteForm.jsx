import React from "react";
import { useSelector } from "react-redux";

//* styles
import styles from "../../../scss/components/teacher/Classrooms/TeacherInvite.module.scss";

//* input
import TeacherInviteInput from "../../UI/Input/SignupInput";

//* component
import MailIcon from "../../UI/Icons/form/MailIcon";
import useInput from "../../../hooks/user-input";

//* utils
import { isEmail } from "../../../utils/validation";
import PrimaryBtn from "../../UI/Buttons/PrimaryBtn";
import LoadingWheel from "../../UI/loading/LoadingWheel";

const TeacherInviteForm = ({ errorMessage, isSubmitting, inviteMail }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //& Teacher Input hook ----------------------------------------------------------
  const {
    enteredValue: TeacherInviteEnteredValue,
    hasError: TeacherInviteHasError,
    isValid: TeacherInviteIsValid,
    onBlurHandler: TeacherInviteBlurHandler,
    onChangeHandler: TeacherInviteChangeHandler,
  } = useInput(isEmail);

  const formIsValid = TeacherInviteIsValid;

  inviteMail(TeacherInviteEnteredValue);
  //& ----------------------------------------------------------

  return (
    <article className={`${styles["article"]} ${themeMode && styles["dark"]}`}>
      <div
        className={`${styles["teacher-invite-div"]} ${
          TeacherInviteHasError && styles["is-valid"]
        } ${errorMessage && errorMessage.errorMessage && styles["is-valid"]}`}
      >
        <TeacherInviteInput
          Icon={MailIcon}
          placeholder="Teacher Email"
          className={styles["teacher-input"]}
          required={true}
          name="teacher-invite-email"
          id="teacher-invite-email"
          defaultValue={TeacherInviteEnteredValue}
          onChange={TeacherInviteChangeHandler}
          onBlur={TeacherInviteBlurHandler}
        />
        <h4>
          {errorMessage && errorMessage.errorMessage
            ? errorMessage.errorMessage
            : "Enter valid email ID"}
        </h4>
      </div>
      <div className={styles["invite-btn"]}>
        <PrimaryBtn type={"submit"} disabled={!formIsValid | isSubmitting}>
          {isSubmitting ? <LoadingWheel /> : "Invite Teacher"}
        </PrimaryBtn>
      </div>
    </article>
  );
};

export default TeacherInviteForm;
