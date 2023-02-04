// dependencies
import React from "react";
import { useSelector } from "react-redux";
import { Form, Link } from "react-router-dom";

// custom hook
import useInput from "../../hooks/user-input";
// styles
import styles from "../../scss/components/Signup/SignupModel.module.scss";

// logo
import EdugateSmallLight from "../UI/logo/EdugateSmallLight";
import EdugateSmallDark from "../UI/logo/EdugateSmallDark";

// UI
import Card from "../UI/Card/Card";
import SignupInput from "../UI/Input/SignupInput";
import PrimaryBtn from "../UI/Buttons/PrimaryBtn";

// Icons
import UserIcon from "../UI/Icons/UserIcon";
import EmailIcon from "../UI/Icons/EmailIcon";
import PhoneIcon from "../UI/Icons/PhoneIcon";
import Date from "../UI/Icons/Date";
import Lock from "../UI/Icons/Lock";
import PasswordInput from "../UI/Input/PasswordInput";

const SignupModel = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const isEmpty = (value) => value.trim() !== "";
  const isNumber = (value) => value.match(/^\+\d{1,3}\d{0,9}$/);
  const isValidEmail = (value) => emailRegex.test(value);
  const isPassword = (value) => value.trim().length > 6;
  const isConfirmPass = (value) => value === passwordValue;

  // useInput state
  const {
    isValid: enteredUsernameIsValid,
    enteredValue: usernameValue,
    hasError: usernameHasError,
    onChangeHandler: usernameChangeHandler,
    onBlurHandler: usernameBlurHandler,
  } = useInput(isEmpty);

  const {
    isValid: enteredEmailIsValid,
    enteredValue: emailValue,
    hasError: emailHasError,
    onChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
  } = useInput(isValidEmail);

  const {
    isValid: enteredNumberIsValid,
    enteredValue: numberValue,
    hasError: numberHasError,
    onChangeHandler: numberChangeHandler,
    onBlurHandler: numberBlurHandler,
  } = useInput(isNumber);

  const {
    isValid: enteredDobIsValid,
    enteredValue: dobValue,
    hasError: dobHasError,
    onChangeHandler: dobChangeHandler,
    onBlurHandler: dobBlurHandler,
  } = useInput(isEmpty);

  const {
    isValid: enteredPasswordIsValid,
    enteredValue: passwordValue,
    hasError: passwordHasError,
    onChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
  } = useInput(isPassword);

  const {
    isValid: enteredConfirmPassIsValid,
    enteredValue: confirmPassValue,
    hasError: confirmPassHasError,
    onChangeHandler: confirmPassChangeHandler,
    onBlurHandler: confirmPassBlurHandler,
  } = useInput(isConfirmPass);

  let formIsValid = false;

  if (
    enteredUsernameIsValid &&
    enteredEmailIsValid &&
    enteredNumberIsValid &&
    enteredDobIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPassIsValid
  ) {
    formIsValid = true;
  }

  return (
    <Card
      className={`${styles["signup-card"]} ${
        themeMode ? styles["dark-card"] : styles["light-card"]
      }`}
    >
      <header>
        {themeMode ? (
          <Link to="/">
            <EdugateSmallDark />
          </Link>
        ) : (
          <Link to="/">
            <EdugateSmallLight />
          </Link>
        )}
        <h1>
          Welcome to <span>EDUGATE</span>
        </h1>
      </header>
      <main>
        <Form method="post" action="/signup" className={styles["signup-form"]}>
          <h1>Signup Now</h1>
          <h2>
            Already have an account?
            <span>
              <Link to="/login">Login</Link>
            </span>
          </h2>
          <div
            className={`${styles.item1} ${
              usernameHasError ? styles["is-valid"] : ""
            }`}
          >
            <SignupInput
              placeholder="Username"
              Icon={UserIcon}
              name="username"
              id="username"
              type="text"
              required={true}
              value={usernameValue}
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
            />
            <h6>Enter valid name</h6>
          </div>
          <div
            className={`${styles.item2} ${
              emailHasError ? styles["is-valid"] : ""
            }`}
          >
            <SignupInput
              placeholder="Email"
              name="emailId"
              type="email"
              Icon={EmailIcon}
              required={true}
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            <h6>Enter valid Email</h6>
          </div>

          <div
            className={`${styles.item3} ${
              numberHasError ? styles["is-valid"] : ""
            }`}
          >
            <SignupInput
              placeholder="+91-7498437637"
              name="phoneNumber"
              type="text"
              Icon={PhoneIcon}
              required={true}
              value={numberValue}
              onChange={numberChangeHandler}
              onBlur={numberBlurHandler}
            />
            <h6>Enter Valid Phone Number</h6>
          </div>

          <div
            className={`${styles.item4} ${
              dobHasError ? styles["is-valid"] : ""
            }`}
          >
            <SignupInput
              placeholder="DOB"
              name="dob"
              type="date"
              Icon={Date}
              required={true}
              defaultValue={dobValue}
              onChange={dobChangeHandler}
              onBlur={dobBlurHandler}
            />
            <h6>Enter Valid DOB</h6>
          </div>

          <div
            className={`${styles.item5} ${
              passwordHasError ? styles["is-valid"] : ""
            }`}
          >
            <PasswordInput
              placeholder="Password"
              name="password"
              Icon={Lock}
              required={true}
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            <h6>Password should be more than 6 character</h6>
          </div>
          <div
            className={`${styles.item6} ${
              confirmPassHasError ? styles["is-valid"] : ""
            }`}
          >
            <PasswordInput
              placeholder="Confirm Password"
              name="confirm password"
              Icon={Lock}
              required={true}
              value={confirmPassValue}
              onChange={confirmPassChangeHandler}
              onBlur={confirmPassBlurHandler}
            />
            <h6>Enter Valid Password</h6>
          </div>
          <div className={styles["submit-btn"]}>
            <PrimaryBtn disabled={!formIsValid}>SignUp</PrimaryBtn>
          </div>
        </Form>
      </main>
      <footer></footer>
    </Card>
  );
};

export default SignupModel;
