import React from "react";

//^ stylesheet
import styles from "./StudentFormFooter.module.scss";

//^ component
import UpdateFormInput from "../../../../../components/UI/Input/SignupInput";

//^ light icons
import UserIcon from "../../../../../components/UI/Icons/update-form/light/UserIcon";
import UserDOB from "../../../../../components/UI/Icons/update-form/light/DOBIcon";
import UserPhone from "../../../../../components/UI/Icons/update-form/light/PhoneIcon";
import UserEmail from "../../../../../components/UI/Icons/update-form/light/EmailIcon";

//^ hook
import useInput from "../../../../../hooks/user-input";

//^ utils
import { isEmail, isEmpty, isNumber } from "../../../../../utils/validation";

const StudentFormFooter = ({
  studentFirstName,
  studentLastName,
  studentDOB,
  studentPhone,
  studentEmailID,
  studentBio,
}) => {
  //^ Student First name validation hook
  const {
    enteredValue: studentFNEnteredValue,
    hasError: studentFNHasError,
    isValid: studentFNIsValid,
    onBlurHandler: studentFNOnBlurHandler,
    onChangeHandler: studentFNOnChangeHandler,
  } = useInput(isEmpty);

  //^ Student Last name validation hook
  const {
    enteredValue: studentLNEnteredValue,
    hasError: studentLNHasError,
    isValid: studentLNIsValid,
    onBlurHandler: studentLNOnBlurHandler,
    onChangeHandler: studentLNOnChangeHandler,
  } = useInput(isEmpty);

  //^ Student DOB validation hook
  const {
    enteredValue: studentDOBEnteredValue,
    hasError: studentDOBHasError,
    isValid: studentDOBIsValid,
    onBlurHandler: studentDOBOnBlurHandler,
    onChangeHandler: studentDOBOnChangeHandler,
  } = useInput(isEmpty);

  //^ Student phone no. validation hook
  const {
    enteredValue: studentPhoneEnteredValue,
    hasError: studentPhoneHasError,
    isValid: studentPhoneIsValid,
    onBlurHandler: studentPhoneOnBlurHandler,
    onChangeHandler: studentPhoneOnChangeHandler,
  } = useInput(isNumber);

  //^ Student email validation hook
  const {
    enteredValue: studentEmailEnteredValue,
    hasError: studentEmailHasError,
    isValid: studentEmailIsValid,
    onBlurHandler: studentEmailOnBlurHandler,
    onChangeHandler: studentEmailOnChangeHandler,
  } = useInput(isEmail);

  //^ Student bio validation hook
  const {
    enteredValue: studentBioEnteredValue,
    hasError: studentBioHasError,
    isValid: studentBioIsValid,
    onBlurHandler: studentBioOnBlurHandler,
    onChangeHandler: studentBioOnChangeHandler,
  } = useInput((value) => value.trim().length < 500);

  return (
    <>
      <div className={styles["input-form-div"]}>
        <div
          className={`${styles["input-1"]} ${
            studentFNHasError && styles["is-valid"]
          }`}
        >
          <label htmlFor="user-first-name">First name: </label>
          <UpdateFormInput
            Icon={UserIcon}
            placeholder={`First Name`}
            id={`user-first-name`}
            name={"user-first-name"}
            defaultValue={studentFirstName}
            onChange={studentFNOnChangeHandler}
            onBlur={studentFNOnBlurHandler}
          />
          <h5>Enter valid First name</h5>
        </div>
        <div
          className={`${styles["input-2"]} ${
            studentLNHasError && styles["is-valid"]
          }`}
        >
          <label htmlFor="user-last-name">Last name: </label>
          <UpdateFormInput
            Icon={UserIcon}
            placeholder={`Last Name`}
            defaultValue={studentLastName}
            id="user-last-name"
            name="user-last-name"
            onChange={studentLNOnChangeHandler}
            onBlur={studentLNOnBlurHandler}
          />
          <h5>Enter valid last name</h5>
        </div>
        <div
          className={`${styles["input-3"]} ${
            studentDOBHasError && styles["is-valid"]
          }`}
        >
          <label htmlFor="user-dob">Date of birth: </label>
          <UpdateFormInput
            Icon={UserDOB}
            type="date"
            placeholder={`Date of birth`}
            defaultValue={studentDOB}
            id="user-dob"
            name="user-dob"
            onChange={studentDOBOnChangeHandler}
            onBlur={studentDOBOnBlurHandler}
          />
          <h5>Enter valid DOB</h5>
        </div>
        <div
          className={`${styles["input-4"]} ${
            studentPhoneHasError && styles["is-valid"]
          }`}
        >
          <label htmlFor="user-phone">Phone no: </label>
          <UpdateFormInput
            Icon={UserPhone}
            placeholder={"Phone number"}
            defaultValue={studentPhone}
            id="user-phone"
            name="user-phone"
            onChange={studentPhoneOnChangeHandler}
            onBlur={studentPhoneOnBlurHandler}
          />
          <h5>Enter valid phone no.</h5>
        </div>
        <div
          className={`${styles["input-5"]} ${
            studentEmailHasError && styles["is-valid"]
          }`}
        >
          <label htmlFor="user-email">Email ID: </label>
          <UpdateFormInput
            className={styles["email-input"]}
            Icon={UserEmail}
            placeholder={"Email ID"}
            defaultValue={studentEmailID}
            id="user-email"
            name="user-email"
            onChange={studentEmailOnChangeHandler}
            onBlur={studentEmailOnBlurHandler}
          />
          <h5>Enter valid Email ID.</h5>
        </div>
        <div
          className={`${styles["input-6"]} ${
            studentBioHasError && styles["is-valid"]
          }`}
        >
          <label htmlFor="user-bio">Bio</label>
          <textarea
            id="user-bio"
            name="user-bio"
            placeholder="Tell about yourself(write upto 500 characters)"
            defaultValue={studentBio}
            onChange={studentBioOnChangeHandler}
            onBlur={studentBioOnBlurHandler}
          />
          <h5>You can write your bio upto 500 characters</h5>
        </div>
      </div>
    </>
  );
};

export default StudentFormFooter;
