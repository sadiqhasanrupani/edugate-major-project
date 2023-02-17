import React from "react";
import { Link } from "react-router-dom";

import styles from "../../scss/components/Error/ErrorContent.module.scss";

import PrimaryBtn from "../../components/UI/Buttons/PrimaryBtn";

const ErrorContent = ({ errorStatus, errorData }) => {
  return (
    <>
      <article className={styles.article}>
        <h1>{errorStatus}</h1>
        <h2>OOOps!</h2>
        <h2>Page Not Found</h2>
        <p>{errorData}</p>
        <div>
          <Link to="/">
            <PrimaryBtn className={styles.btn}>Back to Homepage</PrimaryBtn>
          </Link>
        </div>
      </article>
    </>
  );
};

export default ErrorContent;
