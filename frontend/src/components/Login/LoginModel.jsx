import { useSelector } from "react-redux";
import { Form, Link } from "react-router-dom";

// styles
import styles from "../../scss/components/Login/LoginModel.module.scss";

// UI
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import TeacherBtn from "../UI/Buttons/TeacherBtn";
import StudentBtn from "../UI/Buttons/StudentBtn";
import PrimaryBtn from "../UI/Buttons/PrimaryBtn";
import AdminBtn from "../UI/Buttons/AdminBtn";

const LoginModel = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  return (
    <>
      <Card
        className={`${styles.card} ${
          themeMode ? styles["dark-card"] : styles["light-card"]
        }`}
      >
        <h1>Login</h1>
        {/* Form */}
        <Form method="post" className={`${styles["login-input"]}`}>
          <Input
            className={styles["user-input"]}
            type="text"
            name="userName"
            id="userName"
            placeholder="Username"
            required={true}
          />
          <Input
            className={styles["pass-input"]}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required={true}
          />
          <div className={styles["forget-pass"]}>
            <p>Forget Password?</p>
          </div>
          <div className={styles["auth-btn"]}>
            <AdminBtn className={styles["hover-effect"]} />
            <TeacherBtn className={styles["hover-effect"]} />
            <StudentBtn className={styles["hover-effect"]}  />
          </div>
          <div className={styles["submit-btn"]}>
            <PrimaryBtn className={styles["primary-btn"]}>Login</PrimaryBtn>
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
