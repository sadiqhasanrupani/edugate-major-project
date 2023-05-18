import React from "react";

import styles from "./RectangleInput.module.scss";

const RectangleInput = ({
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
  value,
  defaultValue,
  errorMessage,
  themeMode,
  hasError,
}) => {
  return (
    <>
      <div
        className={`${styles["rectangle-input"]} ${
          themeMode && styles["dark"]
        } ${hasError && styles["is-valid"]} ${className}`}
      >
        <input
          ref={ref}
          type={type}
          className={`${styles.input}`}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          id={id}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          value={value}
          defaultValue={defaultValue}
        />
        <h5>{errorMessage}</h5>
      </div>
    </>
  );
};

export default RectangleInput;
