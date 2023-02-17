// dependencies
import React from "react";

// styles
import styles from "./Error.module.scss";

// components
import ErrorBoy from "../../components/Error/Boy404";
import ErrorContent from "../../components/Error/ErrorContent";

const Error = () => {

  const themeMode = JSON.parse(localStorage.getItem("theme"));

  const errorStatus = "404";

  const errorData = `This page doesn’t exist or was removed!
  We suggest you back to home`;

  return (
    <>
      <section className={`${styles.section} ${themeMode ? styles.dark : styles.light}`}>
        <div className={styles["error-boy"]}>
          <ErrorBoy />
        </div>
        <div className={styles['error-content']}>
          <ErrorContent errorStatus={errorStatus} errorData={errorData} />
        </div>
      </section>
    </>
  );
};

export default Error;
