import React from "react";
import { useSelector } from "react-redux";

import styles from "../../../scss/components/Buttons/UploadBtn.module.scss";

//^ icons
import UploadIcon from "../../UI/Icons/subjectIcons/UploadIcon";

//^ dark icons
import DarkUploadIcon from "../../UI/Icons/subjectIcons/Dark/UploadIcon";

const UploadBtn = ({
  children,
  htmlFor,
  className,
  onClick,
  onBlur,
  onChange,
}) => {
  //^ theme-mode
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <label
      htmlFor={htmlFor}
      className={`${styles["upload-btn"]} ${
        themeMode && styles["dark"]
      } ${className}`}
      onClick={onClick}
      onBlur={onBlur}
      onChange={onChange}
    >
      {themeMode ? <DarkUploadIcon /> : <UploadIcon />}
      {children}
    </label>
  );
};

export default UploadBtn;
