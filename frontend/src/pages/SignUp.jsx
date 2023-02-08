// dependencies
import React, { useEffect } from "react";
import { redirect } from "react-router-dom";
import { gsap } from "gsap";

//styles
import styles from "../scss/pages/SignUp.module.scss";

// components
import SignupModel from "../components/Signup/SignupModel";

// image
import GirlsAndBoysWithLaptop from "../assets/Images/girls-and-boy-sitting-with-laptop.png";

const SignUp = () => {
  useEffect(() => {
    const timeline = gsap.timeline();
    // timeline.fromTo(".signup", { x: -1000, opacity: 0 }, { x: 0, opacity: 1 });
    timeline.fromTo(
      ".signup-model",
      { x: -1000, opacity: 0 },
      { x: 0, opacity: 1 }
    );
    timeline.fromTo(
      ".signup-image",
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1 }
    );
  }, []);
  return (
    <>
      <section className={`signup ${styles["signup-section"]}`}>
        <div className={`signup-model`}>
          <SignupModel />
        </div>
        <div className={`signup-image ${styles["background-img"]}`}>
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
