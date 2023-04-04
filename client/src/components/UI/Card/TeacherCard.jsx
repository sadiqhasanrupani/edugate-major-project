import React from "react";
import { useSelector } from "react-redux";

import styles from "./TeacherCard.module.scss";

const TeacherCard = ({
  children,
  onClick,
  onBlur,
  onChange,
  ref,
  key,
  className,
}) => {
  const themeMode = useSelector(state => state.ui.isDarkMode)

  return (
    <div
      key={key}
      ref={ref}
      className={`${styles["teacher-card"]} ${
        themeMode ? styles["dark-mode"] : undefined
      } ${className}`}
      onClick={onClick}
      onBlur={onBlur}
      onChange={onChange}
    >
      {children}
    </div>
  );
};

export default TeacherCard;
