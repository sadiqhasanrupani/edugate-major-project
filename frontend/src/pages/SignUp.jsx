// dependencies
import React from "react";
import { redirect } from "react-router-dom";

//styles
import styles from "../scss/pages/SignUp.module.scss";

// components
import SignupModel from "../components/Signup/SignupModel";

// image
import GirlsAndBoysWithLaptop from "../assets/Images/girls-and-boy-sitting-with-laptop.png";

// hooks
import useFetch from "../components/hooks/use-fetch";

const SignUp = () => {
  return (
    <>
      <section className={`${styles["signup-section"]}`}>
        <div>
          <SignupModel />
        </div>
        <div className={styles["background-img"]}>
          <img
            src={GirlsAndBoysWithLaptop}
            alt="signup-background"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
};

export const action = async ({ request, param }) => {
  const data = await request.formData();
  const name = data.get("username");
  const emailId = data.get("emailId");
  const phoneNumber = data.get("phoneNumber");
  const dob = data.get("dob");
  const password = data.get("password");

  const signupObj = {
    name,
    emailId,
    phoneNumber,
    dob,
    password,
  };

  console.log(signupObj);

  // fetch("http://localhost:8080/")

  return redirect("/login");
};

export default SignUp;
