// dependencies
import React from "react";
import { useSelector } from "react-redux";
import { Form, Link } from "react-router-dom";

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

const SignupModel = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
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
          <div className={styles.item1}>
            <SignupInput
              placeholder="Username"
              Icon={UserIcon}
              name="username"
              id="username"
              type="text"
              required={true}
            />
            <h6>Enter Valid Name</h6>
          </div>
          <div className={styles.item2}>
            <SignupInput
              placeholder="Email"
              name="emailId"
              type="email"
              Icon={EmailIcon}
              required={true}
            />
            <h6>Enter Valid Email</h6>
          </div>

          <div className={styles.item3}>
            <SignupInput
              placeholder="+91-7498437637"
              name="phoneNumber"
              type="text"
              Icon={PhoneIcon}
              required={true}
            />
            <h6>Enter Valid Phone Number</h6>
          </div>

          <div className={styles.item4}>
            <SignupInput
              placeholder="DOB"
              name="dob"
              type="date"
              Icon={Date}
              required={true}
            />
            <h6>Enter Valid DOB</h6>
          </div>

          <div className={styles.item5}>
            <SignupInput
              placeholder="Password"
              name="password"
              type="password"
              Icon={Lock}
              required={true}
            />
            <h6>Password should be more than 6 character</h6>
          </div>
          <div className={styles.item6}>
            <SignupInput
              placeholder="Confirm Password"
              name="confirm password"
              type="password"
              Icon={Lock}
              required={true}
            />
            <h6>Enter Valid Name</h6>
          </div>
          <div className={styles["submit-btn"]}>
            <PrimaryBtn>SignUp</PrimaryBtn>
          </div>
        </Form>
      </main>
      <footer></footer>
    </Card>
  );
};

export default SignupModel;
