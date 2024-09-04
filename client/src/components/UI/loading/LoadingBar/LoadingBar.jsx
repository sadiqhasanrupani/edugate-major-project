import React from "react";

import styles from "./LoadingBar.module.scss";

const LoadingBar = ({ progress }) => {
  return (
    <div className={styles["loading"]}>
      <div className={styles["loading-bar"]}>
        <div
          className={styles["loading-bar-progress"]}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div>{progress}%</div>
    </div>
  );
};

export default LoadingBar;
