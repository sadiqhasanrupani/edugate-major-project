import React from "react";
import { useSelector } from "react-redux";

//^ styles
import styles from "./HTMLRenderer.module.scss";

const HTMLRenderer = ({ html }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <div
      className={`${styles["html-div"]} ${themeMode && styles["dark"]}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default HTMLRenderer;
