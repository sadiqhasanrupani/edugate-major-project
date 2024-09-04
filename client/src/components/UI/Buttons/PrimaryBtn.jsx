import React from "react";
import { useSelector } from "react-redux";

import styles from "./PrimaryBtn.module.scss";

const PrimaryBtn = ({
  children,
  className,
  ref,
  onBlur,
  onChange,
  onClick,
  onFocus,
  type,
  disabled,
}) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  return (
    <button
      ref={ref}
      className={`${styles.btn} ${
        themeMode ? styles["dark-btn"] : styles["light-btn"]
      } ${className}`}
      onClick={onClick}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
