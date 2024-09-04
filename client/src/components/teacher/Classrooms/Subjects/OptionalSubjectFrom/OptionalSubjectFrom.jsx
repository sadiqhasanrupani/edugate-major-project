import { useSelector } from "react-redux";

//^ stylesheet
import styles from "./OptionalSubjectForm.module.scss";

//^ components
import SubjectInput from "../../../../UI/Input/SignupInput";
import PrimaryBtn from "../../../../UI/Buttons/PrimaryBtn";
import LoadingWheel from "../../../../UI/loading/LoadingWheel";

//^ hooks
import useInput from "../../../../../hooks/user-input";

//^ icons
import SubjectInputIcon from "../../../../UI/Icons/SubjectInputIcon";

//^ utils
import { isEmpty } from "../../../../../utils/validation";

const OptionalSubjectFrom = ({
  onSubmit,
  isLoading,
  errorMessage,
  onOptionalSubjectForm,
}) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ subject no.1 hook
  const {
    enteredValue: subjectNameOneEnteredValue,
    hasError: subjectNameOneHasError,
    isValid: subjectNameOneIsValid,
    onChangeHandler: subjectNameOneOnChangeHandler,
    onBlurHandler: subjectNameOneOnBlurHandler,
  } = useInput(isEmpty);

  //^ subject no.2 hook
  const {
    enteredValue: subjectNameTwoEnteredValue,
    hasError: subjectNameTwoHasError,
    isValid: subjectNameTwoIsValid,
    onChangeHandler: subjectNameTwoOnChangeHandler,
    onBlurHandler: subjectNameTwoOnBlurHandler,
  } = useInput(
    (value) => value.trim().length !== 0 && value !== subjectNameOneEnteredValue
  );

  const isFormValid = subjectNameOneIsValid && subjectNameTwoIsValid;

  const data = {
    subjectNameOneEnteredValue,
    subjectNameTwoEnteredValue,
  };

  onOptionalSubjectForm(data);

  return (
    <section
      className={`${styles["portal-section"]} ${themeMode && styles["dark"]}`}
    >
      <div
        className={`${styles["subject-1-div"]} ${
          subjectNameOneHasError ? styles["is-valid"] : undefined
        } ${
          errorMessage && errorMessage.message ? styles["is-valid"] : undefined
        } `}
      >
        <SubjectInput
          className={styles["subject-input"]}
          Icon={SubjectInputIcon}
          placeholder={"Subject No.1"}
          defaultValue={subjectNameOneEnteredValue}
          onChange={subjectNameOneOnChangeHandler}
          onBlur={subjectNameOneOnBlurHandler}
          name={`subject-name-one`}
        />

        <h4>
          {errorMessage && errorMessage.message
            ? errorMessage.message
            : "Enter valid subject name."}
        </h4>
      </div>
      <div
        className={`${styles["subject-2-div"]} ${
          subjectNameTwoHasError ? styles["is-valid"] : undefined
        } ${
          errorMessage && errorMessage.message ? styles["is-valid"] : undefined
        } `}
      >
        <SubjectInput
          className={styles["subject-input"]}
          Icon={SubjectInputIcon}
          placeholder={"Subject No.2"}
          defaultValue={subjectNameTwoEnteredValue}
          onChange={subjectNameTwoOnChangeHandler}
          onBlur={subjectNameTwoOnBlurHandler}
          name={`subject-name-two`}
        />
        <h4>
          {errorMessage && errorMessage.message
            ? errorMessage.message
            : "Enter valid subject name."}
        </h4>
      </div>
      <div className={styles["primary-btn-div"]}>
        <PrimaryBtn disabled={!isFormValid | isLoading} onClick={onSubmit}>
          {isLoading ? <LoadingWheel /> : "Create Subject"}
        </PrimaryBtn>
      </div>
    </section>
  );
};

export default OptionalSubjectFrom;
