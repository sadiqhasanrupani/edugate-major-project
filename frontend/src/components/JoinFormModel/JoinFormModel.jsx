//* dependencies
import React from "react";
import { useNavigation } from "react-router-dom";

import styles from "../../scss/components/JoinFormModel/JoinFormModel.module.scss";

//* component
import JoinInput from "../UI/Input/SignupInput";
import AddUser from "../UI/Icons/AddUser";
import PrimaryBtn from "../UI/Buttons/PrimaryBtn";
import LoadingWheel from "../UI/loading/LoadingWheel";

//* hooks
import useInput from "../../hooks/user-input";

//* utils
import { isEmpty } from "../../utils/validation";

const JoinFormModel = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const {
    enteredValue: joinInputEnteredValue,
    hasError: joinInputHasError,
    isValid: joinInputIsValid,
    onBlurHandler: joinInputOnBlurHandler,
    onChangeHandler: joinInputOnChangeHandler,
  } = useInput(isEmpty);

  const isFormValid = joinInputIsValid;

  return (
    <>
      <div className={`${styles["join-form-model"]}`}>
        <div
          className={`${joinInputHasError ? styles["is-valid"] : undefined}`}
        >
          <JoinInput
            type={"password"}
            Icon={AddUser}
            className={styles["join-input"]}
            placeholder={"Classroom Code"}
            defaultValue={joinInputEnteredValue}
            onChange={joinInputOnChangeHandler}
            onBlur={joinInputOnBlurHandler}
            name={"class-code"}
          />

          <h3>Enter valid class code</h3>
        </div>
        <div>
          <PrimaryBtn
            disabled={!isFormValid | isSubmitting}
            type={"submit"}
            className={styles["primary-btn"]}
          >
            {isSubmitting ? <LoadingWheel /> : "Join Classroom"}
          </PrimaryBtn>
        </div>
      </div>
    </>
  );
};

export default JoinFormModel;
