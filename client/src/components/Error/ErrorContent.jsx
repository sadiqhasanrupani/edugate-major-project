import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../scss/components/Error/ErrorContent.module.scss";

import PrimaryBtn from "../../components/UI/Buttons/PrimaryBtn";

const ErrorContent = ({ errorStatus, errorData }) => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <article className={styles.article}>
        <h1>{errorStatus}</h1>
        <h2>OOOps!</h2>
        <h2>Page Not Found</h2>
        <p>{errorData}</p>
        <div>
          <PrimaryBtn className={styles.btn} onClick={goBackHandler}>
            Go Back
          </PrimaryBtn>
        </div>
      </article>
    </>
  );
};

export default ErrorContent;
