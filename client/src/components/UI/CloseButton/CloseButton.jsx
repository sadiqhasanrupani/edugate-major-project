import React from "react";

import styles from "./CloseButton.module.scss"

const CloseButton = () => {
  return (
    <div className={styles['container']}>
      <div className={styles["close-button"]}></div>
    </div>
  );
};

export default CloseButton;
