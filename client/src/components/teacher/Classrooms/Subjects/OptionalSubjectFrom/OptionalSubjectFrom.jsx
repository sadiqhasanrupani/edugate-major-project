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

  const {
    enteredValue: subjectNameEnteredValue,
    hasError: subjectNameHasError,
    isValid: subjectNameIsValid,
    onChangeHandler: subjectNameOnChangeHandler,
    onBlurHandler: subjectNameOnBlurHandler,
  } = useInput(isEmpty);

  const isFormValid = subjectNameIsValid;

  onOptionalSubjectForm(subjectNameEnteredValue);

  return (
    <section
      className={`${styles["portal-section"]} ${themeMode && styles["dark"]}`}
    >
      <div
        className={`${styles["subject-div"]} ${
          subjectNameHasError ? styles["is-valid"] : undefined
        } ${
          errorMessage && errorMessage.message ? styles["is-valid"] : undefined
        } `}
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
        <h4>
          {errorMessage && errorMessage.message
            ? errorMessage.message
            : "Enter valid subject name"}
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
