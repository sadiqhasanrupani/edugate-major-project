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
    <Card className={styles["signup-card"]}>
      <header>
        {themeMode ? <EdugateSmallDark /> : <EdugateSmallLight />}
        <h1>
          Welcome to <span>EDUGATE</span>
        </h1>
      </header>
      <main>
        <Form method="post" className={styles["signup-form"]}>
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
            />
            <h6>Enter Valid Name</h6>
          </div>
          <div className={styles.item2}>
            <SignupInput placeholder="Email" type="email" Icon={EmailIcon} />
            <h6>Enter Valid Email</h6>
          </div>

          <div className={styles.item3}>
            <SignupInput
              placeholder="+91-7498437637"
              type="text"
              Icon={PhoneIcon}
            />
            <h6>Enter Valid Phone Number</h6>
          </div>

          <div className={styles.item4}>
            <SignupInput placeholder="DOB" type="date" Icon={Date} />
            <h6>Enter Valid DOB</h6>
          </div>

          <div className={styles.item5}>
            <SignupInput placeholder="Password" type="password" Icon={Lock} />
            <h6>Password should be more than 6 character</h6>
          </div>
          <div className={styles.item6}>
            <SignupInput
              placeholder="Confirm Password"
              type="password"
              Icon={Lock}
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
