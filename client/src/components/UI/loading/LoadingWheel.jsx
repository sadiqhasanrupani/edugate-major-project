import React from "react";

import styles from "./LoadingWheel.module.scss";

const LoadingWheel = ({ className, loader }) => {
  return (
    <>
      <div className={`${styles.loader}`}>
        <div className={`${styles.spinner} ${className}`} />
      </div>
    </>
  );
};

export default LoadingWheel;
