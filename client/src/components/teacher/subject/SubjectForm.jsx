import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";

//* styles
import styles from "../../../scss/components/teacher/subject/SubjectForm.module.scss";

//* components
import SubjectInput from "../../UI/Input/SignupInput";
import SubjectInputIcon from "../../UI/Icons/SubjectInputIcon";
import PrimaryBtn from "../../UI/Buttons/PrimaryBtn";
import CloseBtn from "../../UI/Icons/CloseIcon";
import DarkCloseIcon from "../../UI/Icons/Dark/DarkCloseIcon";

//* actions
import { uiAction } from "../../../store/ui-slice";

//* hooks
import useInput from "../../../hooks/user-input";

const SubjectForm = ({ classId }) => {
  const dispatch = useDispatch();

  //* selecting the themeMode boolean value
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const closeBtnHandler = () => {
    dispatch(uiAction.compulsorySubjectFormHandler());
  };

  const isEmpty = (value) => value.trim().length !== 0;

  const {
    enteredValue: subjectNameEnteredValue,
    hasError: subjectNameHasError,
    isValid: subjectNameIsValid,
    onBlurHandler: subjectNameOnBlurHandler,
    onChangeHandler: subjectNameOnChangeHandler,
  } = useInput(isEmpty);

  const isFormValid = subjectNameIsValid;

  const formSubmitHandler = (e) => {
    dispatch(uiAction.compulsorySubjectFormHandler());
  };

  return (
    <section
      className={`${styles["portal-section"]} ${themeMode && styles["dark"]}`}
    >
      <div className={styles["header"]}>
        <h1>Create subject</h1>
        <div className={styles['button-icon-div']} >
          <button onClick={closeBtnHandler}>
            {themeMode ? <DarkCloseIcon /> : <CloseBtn />}
          </button>
        </div>
      </div>
      <Form
        method="POST"
        action={`/teacher/classroom/${classId}/subjects`}
        className={styles["subject-form-input"]}
        onSubmit={formSubmitHandler}
      >
        <div
          className={`${styles["subject-div"]} ${
            subjectNameHasError ? styles["is-valid"] : undefined
          }`}
        >
          <SubjectInput
            className={styles["subject-input"]}
            Icon={SubjectInputIcon}
            placeholder={"Subject name"}
            defaultValue={subjectNameEnteredValue}
            onChange={subjectNameOnChangeHandler}
            onBlur={subjectNameOnBlurHandler}
            name={`subject-name`}
          />
          <h2>Enter valid subject name</h2>
        </div>
        <input
          type="text"
          style={{ display: "none" }}
          defaultValue={classId}
          name={`class-id`}
        />
        <div className={styles["primary-btn-div"]}>
          <PrimaryBtn disabled={!isFormValid}>Create Subject</PrimaryBtn>
        </div>
      </Form>
    </section>
  );
};

export default SubjectForm;
