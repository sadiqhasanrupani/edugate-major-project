import React from "react";

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
}) => {
  return (
    <button
      ref={ref}
      className={`${styles.btn} ${className}`}
      onClick={onClick}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      type={type}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
