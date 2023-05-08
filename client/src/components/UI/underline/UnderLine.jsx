import React from "react";
import { useSelector } from "react-redux";

import styles from "./UnderLine.module.scss";

const UnderLine = ({ className }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <hr
      className={`${styles["hr"]} ${themeMode && styles["dark"]} ${className}`}
    />
  );
};

export default UnderLine;
