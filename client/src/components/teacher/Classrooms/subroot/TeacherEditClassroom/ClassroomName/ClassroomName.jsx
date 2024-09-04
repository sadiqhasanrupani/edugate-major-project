import React, { useEffect } from "react";

import styles from "./ClassroomName.module.scss";

//^ hooks
import useInput from "../../../../../../hooks/user-input";

//^ component
import SimpleInput from "../../../../../UI/Input/SimpleInput";

const ClassroomName = ({ themeMode, classroomName, onClassroomName }) => {
  const {
    enteredValue: classNameEnteredValue,
    hasError: classNameHasError,
    isValid: classNameIsValid,
    onBlurHandler: classNameBlurHandler,
    onChangeHandler: classNameChangeHandler,
  } = useInput((value) => value.trim().length > 0 && value !== classroomName);

  useEffect(() => {
    const data = {
      isValid: classNameIsValid,
      className: classNameEnteredValue,
    };
    onClassroomName(data);
  }, [classNameIsValid, classNameEnteredValue, onClassroomName]);

  return (
    <div
      className={`${styles["classroom-name"]} ${
        classNameHasError && styles["is-valid"]
      } ${themeMode && styles.dark}`}
    >
      <SimpleInput
        className={styles["simple-input"]}
        value={classNameEnteredValue ? classNameEnteredValue : classroomName}
        onChange={classNameChangeHandler}
        onBlur={classNameBlurHandler}
        hasError={classNameHasError}
        inputmessage={"Name should not be same or empty"}
        placeholder={"Enter the classroom name"}
      />
    </div>
  );
};

export default ClassroomName;
