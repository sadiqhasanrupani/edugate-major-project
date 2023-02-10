import React from "react";

import styles from "../../../scss/components/Input/Input.module.scss";

export const Input = ({
  className,
  onChange,
  onBlur,
  ref,
  type,
  name,
  id,
  placeholder,
  required,
  autoComplete,
}) => {
  return (
    <input
      ref={ref}
      type={type}
      className={`${styles.input} ${className}`}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      id={id}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
    />
  );
};

export default Input;
