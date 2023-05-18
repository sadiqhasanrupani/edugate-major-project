import React from "react";

import styles from "./UnderLine.module.scss";

const UnderLine = ({ themeMode, className }) => {
  return (
    <hr
      className={`${styles["hr"]} ${themeMode && styles["dark"]} ${className}`}
    />
  );
};

export default UnderLine;
