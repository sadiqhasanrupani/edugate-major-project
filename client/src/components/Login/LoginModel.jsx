import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";

// styles
import styles from "../../scss/components/Login/LoginModel.module.scss";

// UI
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import TeacherBtn from "../UI/Buttons/TeacherBtn";
import StudentBtn from "../UI/Buttons/StudentBtn";
import PrimaryBtn from "../UI/Buttons/PrimaryBtn";
import LoadingWheel from "../UI/loading/LoadingWheel";

// Regex
import { emailRegex } from "../../utils/regex";

// custom hooks
import useInput from "../../hooks/user-input";

const LoginModel = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [isTeacherCheck, setIsTeacherCheck] = useState(true);
  const [isStudentCheck, setIsStudentCheck] = useState(false);

  const isEmail = (value) => emailRegex.test(value);
  const isPassword = (value) => value.trim().length > 6;

  const {
    enteredValue: emailEnteredValue,
    hasError: emailHasError,
    isValid: emailIsValid,
    onBlurHandler: emailBlurHandler,
    onChangeHandler: emailChangeHandler,
  } = useInput(isEmail);
  const {
    enteredValue: passEnteredValue,
    hasError: passHasError,
    isValid: passIsValid,
    onBlurHandler: passBlurHandler,
    onChangeHandler: passChangeHandler,
  } = useInput(isPassword);

  const TeachercheckHandler = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setIsTeacherCheck(isChecked);
      setIsStudentCheck(false);
    }
  };
  const StudentcheckHandler = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setIsStudentCheck(isChecked);
      setIsTeacherCheck(false);
    }
  };

  const isFormValid = emailIsValid && passIsValid;

  return (
    <>
      <Card
        className={`${styles.card} ${
          themeMode ? styles["dark-card"] : styles["light-card"]
        }`}
      >
        <h1>Login</h1>
        {/* Form */}

        <Form
          method="post"
          action="/login"
          className={`${styles["login-form"]}`}
        >
          <div
            className={`${styles["user-input"]} ${
              emailHasError ? styles["is-valid"] : undefined
            } ${
              data &&
              data.error &&
              data.error.find((err) => err.param === "userEmail")
                ? styles["is-valid"]
                : undefined
            }`}
          >
            <Input
              type="text"
              name="email"
              id="emailId"
              placeholder="Email ID"
              required={true}
              value={emailEnteredValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            <h6>
              {data &&
              data.error &&
              data.error.find((err) => err.param === "userEmail")
                ? data.error.map((err) => {
                    if (err.param === "userEmail") {
                      return (
                        <React.Fragment key={err.param}>
                          {err.msg}
                        </React.Fragment>
                      );
                    }
                  })
                : "Enter valid Email"}
            </h6>
          </div>
          <div
            className={`${styles["pass-input"]} ${
              passHasError ? styles["is-valid"] : undefined
            } ${
              data &&
              data.error &&
              data.error.find((err) => err.param === "userPassword")
                ? styles["is-valid"]
                : undefined
            }`}
          >
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
              required={true}
              value={passEnteredValue}
              onChange={passChangeHandler}
              onBlur={passBlurHandler}
            />
            <h6>
              {data &&
              data.error &&
              data.error.find((err) => err.param === "userPassword")
                ? data.error.map((err) => {
                    if (err.param === "userPassword") {
                      return (
                        <React.Fragment key={err.param}>
                          {err.msg}
                        </React.Fragment>
                      );
                    }
                  })
                : "Enter valid Password"}
            </h6>
          </div>
          <div className={styles["forget-pass"]}>
            <p>Forget Password?</p>
          </div>
          <div className={styles["role-btn"]}>
            <label htmlFor="teacher">
              <TeacherBtn
                className={`${styles["hover-effect"]} ${
                  isTeacherCheck ? styles.checked : undefined
                }`}
                teachertext={`${styles["text"]}`}
              />
            </label>
            <input
              type="radio"
              name="role"
              id="teacher"
              defaultValue="teacher"
              onClick={TeachercheckHandler}
              required
              defaultChecked={isTeacherCheck}
            />

            <label htmlFor="student">
              <StudentBtn
                className={`${styles["hover-effect"]} ${
                  isStudentCheck ? styles.checked : undefined
                }`}
                studenttext={`${styles["text"]}`}
              />
            </label>
            <input
              type="radio"
              name="role"
              id="student"
              defaultValue="student"
              onClick={StudentcheckHandler}
              required
              defaultChecked={isStudentCheck}
            />
          </div>
          <div className={styles["submit-btn"]}>
            <PrimaryBtn
              disabled={!isFormValid }
              className={styles["primary-btn"]}
            >
              {isSubmitting ? <LoadingWheel /> : 'Login'}
            </PrimaryBtn>
            <div className={styles.redirect}>
              <p>
                Don't have an Account? <Link to="/signup">Register</Link>
              </p>
            </div>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default LoginModel;
