// dependencies
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// style
import styles from "../scss/pages/Login.module.scss";

// logo
import EdugateLogoLight from "../components/UI/logo/EdugateLightMode";
import EdugateLogoDark from "../components/UI/logo/EdugateDarkMode";

// components
import LoginModel from "../components/Login/LoginModel";

// svg
import LoginBackground1280 from "../components/Login/LoginBackground1280";
// import Wave from "../components/Login/Wave";

const Login = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <>
      {/* Logo Section */}
      <section
        className={`${styles["login-section"]} ${
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
        <footer>
          {/* <div className={styles.wave}>
            <Wave />
          </div> */}
        </footer>
      </section>
    </>
  );
};

export default Login;
