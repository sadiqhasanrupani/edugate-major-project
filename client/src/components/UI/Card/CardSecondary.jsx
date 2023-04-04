import React from "react";
import { useSelector } from "react-redux";

// styles.
import styles from "./CardSecondary.module.scss";

const CardSecondary = ({
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
      className={`${styles["card-secondary"]} ${
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

export default CardSecondary;
