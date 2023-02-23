// dependencies
import { useEffect } from "react";
import { json, Link, redirect } from "react-router-dom";
import { gsap } from "gsap";

// style
import styles from "../../scss/pages/Login.module.scss";

// logo
import EdugateLogoLight from "../../components/UI/logo/EdugateLightMode";
import EdugateLogoDark from "../../components/UI/logo/EdugateDarkMode";

// components
import LoginModel from "../../components/Login/LoginModel";
import { loader as homeLoader } from "../../pages/static/Home"

// svg
import LoginBackground1280 from "../../components/Login/LoginBackground1280";

const Login = () => {
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo([`.login`], { opacity: 0 }, { opacity: 1 });
  }, []);

  const themeMode = JSON.parse(localStorage.getItem("theme"));

  return (
    <>
      {/* Logo Section */}
      <section
        className={`login ${styles["login-section"]} ${
          themeMode
            ? styles["dark-login-section"]
            : styles["light-login-section"]
        }`}
      >
        {/* EdugateLogoLight */}
        <header>
          {themeMode ? (
            <Link to="/">
              <EdugateLogoDark />
            </Link>
          ) : (
            <Link to="/">
              <EdugateLogoLight />
            </Link>
          )}
        </header>
        {/* Login Component */}
        <main className={styles.main}>
          <div className={styles["login-background"]}>
            <LoginBackground1280 />
          </div>
          <LoginModel />
        </main>
      </section>
    </>
  );
};

export const loader = () => {
  homeLoader();
}

export const action = async ({ request, param }) => {
  const data = await request.formData();
  const loginData = {
    userEmail: data.get("email"),
    userPassword: data.get("password"),
    userRole: data.get("role"),
  };

  const response = await fetch(`${process.env.REACT_APP_HOSTED_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "There is some issue while login." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);

  return redirect("/")
};

export default Login;
