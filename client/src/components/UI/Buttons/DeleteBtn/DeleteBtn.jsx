import React, { Children } from "react";

import styles from "./DeleteBtn.module.scss";

const DeleteBtn = ({
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
  return (
    <button
      ref={ref}
      onBlur={onBlur}
      onChange={onChange}
      onClick={onClick}
      onFocus={onFocus}
      type={type}
      disabled={disabled}
      className={`${styles["delete-btn"]} ${className}`}
    >
      {children}
    </button>
  );
};

export default DeleteBtn;
