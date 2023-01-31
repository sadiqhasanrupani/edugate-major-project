// dependencies
import { useSelector } from "react-redux";

// style
import styles from "../scss/pages/Login.module.scss";

// svg
import EdugateLogo from "../components/UI/logo/EdugateLightMode";

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
        {/* EdugateLogo */}
        <header>
          <EdugateLogo />
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
