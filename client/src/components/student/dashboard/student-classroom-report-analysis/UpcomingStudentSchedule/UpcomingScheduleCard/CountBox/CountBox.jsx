import React from "react";

import styles from "./CountBox.module.scss";

const CountBox = ({ themeMode, count }) => {
  return (
    <div className={`${styles["counter"]} ${themeMode && styles.dark}`}>
      {count}
    </div>
  );
};

export default CountBox;
