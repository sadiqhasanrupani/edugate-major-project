// dependencies
import React from "react";
import { Form, Link, useNavigation, useActionData } from "react-router-dom";

// utils
import { emailRegex, gmailRegex, numRegex } from "../../utils/regex";

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
import LoadingWheel from "../UI/loading/LoadingWheel";

// Icons
import UserIcon from "../UI/Icons/UserIcon";
import EmailIcon from "../UI/Icons/EmailIcon";
import PhoneIcon from "../UI/Icons/PhoneIcon";
import Date from "../UI/Icons/Date";
import Lock from "../UI/Icons/Lock";
import PasswordInput from "../UI/Input/PasswordInput";

const SignupModel = () => {
  // const themeMode = useSelector((state) => state.ui.isDarkMode);
  const themeMode = JSON.parse(localStorage.getItem("theme"));
  const navigation = useNavigation();
  const data = useActionData();
  const isSubmitting = navigation.state === "submitting";

  const isEmpty = (value) => value.trim() !== "";
  const isNumber = (value) => numRegex.test(value);
  const isValidEmail = (value) =>
    emailRegex.test(value) && gmailRegex.test(value);
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
            } ${
              data &&
              data.error &&
              data.error.find((err) => err.param === "userName")
                ? styles["server-is-valid"]
                : undefined
            } `}
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
            <h6>
              {data &&
              data.error &&
              data.error.find((err) => err.param === "userName")
                ? data.error.map((err) => {
                    if (err.param === "userName") {
                      return <React.Fragment key={err.param} >{err.msg}</React.Fragment>;
                    }
                  })
                : "Enter valid userName"}
            </h6>
          </div>
          <div
            className={`${styles.item2} ${
              emailHasError ? styles["is-valid"] : undefined
            } ${
              data &&
              data.error &&
              data.error.find((err) => err.param === "userEmail")
                ? styles["is-valid"]
                : undefined
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
            <div className={styles["validation"]}>
              <h6 className={styles["h6-server-is-valid"]}>
                {data &&
                data.error &&
                data.error.find((err) => err.param === "userEmail")
                  ? data.error.map((err) => {
                      if (err.param === "userEmail") {
                        return <React.Fragment key={err.param} >{err.msg}</React.Fragment>;
                      }
                    })
                  : "Enter valid email"}
              </h6>
            </div>
          </div>

          <div
            className={`${styles.item3} ${
              numberHasError ? styles["is-valid"] : ""
            } ${
              data &&
              data.error &&
              data.error.find((err) => {
                return err.param === "userPhoneNumber";
              })
                ? styles["is-valid"]
                : undefined
            } `}
          >
            <SignupInput
              placeholder="7458437637"
              name="phoneNumber"
              type="text"
              Icon={PhoneIcon}
              required={true}
              value={numberValue}
              onChange={numberChangeHandler}
              onBlur={numberBlurHandler}
            />
            <h6>
              {data &&
              data.error &&
              data.error.find((err) => err.param === "userPhoneNumber")
                ? data.error.map((err) => {
                    if (err.param === "userPhoneNumber") {
                      return <React.Fragment key={err.param} >{err.msg}</React.Fragment>;
                    }
                  })
                : "Phone number should be 10 digits"}
            </h6>
          </div>

          <div
            className={`${styles.item4} ${
              dobHasError ? styles["is-valid"] : ""
            } ${
              data &&
              data.error &&
              data.error.find((err) => err.param === "userDOB")
                ? styles["is-valid"]
                : undefined
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
            <h6 className={styles["h6-server-is-valid"]}>
              {data &&
              data.error &&
              data.error.find((err) => err.param === "userDOB")
                ? data.error.map((err) => {
                    if (err.param === "userDOB") {
                      return <React.Fragment key={err.param} >{err.msg}</React.Fragment>;
                    }
                  })
                : "Enter valid DOB"}
            </h6>
          </div>

          <div
            className={`${styles.item5} ${
              passwordHasError ? styles["is-valid"] : ""
            } ${
              data &&
              data.error &&
              data.error.find((err) => err.param === "userPassword")
                ? styles["is-valid"]
                : undefined
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
              autoComplete="off"
            />

            <h6 className={styles["h6-server-is-valid"]}>
              {data &&
              data.error &&
              data.error.find((err) => err.param === "userPassword")
                ? data.error.map((err) => {
                    if (err.param === "userPassword") {
                      return <React.Fragment key={err.param} >{err.msg}</React.Fragment>;
                    }
                  })
                : "Enter a 6 character alphanumeric password."}
            </h6>
          </div>
          <div
            className={`${styles.item6} ${
              confirmPassHasError ? styles["is-valid"] : ""
            } ${
              data &&
              data.error &&
              data.error.find((err) => err.param === "userConfirmPassword")
                ? styles["is-valid"]
                : undefined
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
              autoComplete="off"
            />

            <h6 className={styles["h6-server-is-valid"]}>
              {data &&
              data.error &&
              data.error.find((err) => err.param === "userConfirmPassword")
                ? data.error.map((err) => {
                    if (err.param === "userConfirmPassword") {
                      return <React.Fragment key={err.param} >{err.msg}</React.Fragment>;
                    }
                  })
                : "Doesn't match with entered password"}
            </h6>
          </div>
          <div className={styles["submit-btn"]}>
            <PrimaryBtn disabled={!formIsValid}>
              {isSubmitting ? <LoadingWheel /> : "SignUp"}
            </PrimaryBtn>
          </div>
        </Form>
      </main>
    </Card>
  );
};

export default SignupModel;
