// dependencies
import React from "react";

//styles
import styles from "../scss/pages/SignUp.module.scss";

// components
import SignupModel from "../components/Signup/SignupModel";

// image
import GirlsAndBoysWithLaptop from "../assets/Images/girls-and-boy-sitting-with-laptop.png";

const SignUp = () => {
  return (
    <>
      <section className={`${styles["signup-section"]}`}>
        <div>
          <SignupModel />
        </div>
        <div className={styles['background-img']}>
          <img src={GirlsAndBoysWithLaptop} alt="login-background" />
        </div>
      </section>
    </>
  );
};

export default SignUp;
