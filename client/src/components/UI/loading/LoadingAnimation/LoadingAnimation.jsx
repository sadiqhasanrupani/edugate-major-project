import React from "react";

import styles from "./LoadingAnimation.module.scss";

const LoadingAnimation = () => {
  return (
    <div className={styles["spinner"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingAnimation;
