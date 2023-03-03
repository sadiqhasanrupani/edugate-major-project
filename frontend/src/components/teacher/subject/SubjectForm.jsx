import React from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-router-dom";

//* styles
import styles from "../../../scss/components/teacher/subject/SubjectForm.module.scss";

//* components
import SubjectInput from "../../UI/Input/SignupInput";
import SubjectInputIcon from "../../UI/Icons/SubjectInputIcon";
import PrimaryBtn from "../../UI/Buttons/PrimaryBtn";
import CloseBtn from "../../UI/Icons/CloseIcon";

//* actions
import { uiAction } from "../../../store/ui-slice";

//* hooks
import useInput from "../../../hooks/user-input";

const SubjectForm = ({ classId }) => {
  const dispatch = useDispatch();

  const closeBtnHandler = () => {
    dispatch(uiAction.SubjectFormHandler());
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

  const formSubmitHandler = () => {
    dispatch(uiAction.SubjectFormHandler());
  };

  return (
    <section className={styles["portal-section"]}>
      <div className={styles["header"]}>
        <h1>Create Subject</h1>
        <div>
          <button onClick={closeBtnHandler}>
            <CloseBtn />
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
