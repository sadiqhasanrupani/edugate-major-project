import React from "react";

import styles from "../../../scss/components/Input/RadioInput.module.scss";

const RadioInput = ({
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
  defaultChecked,
  children,
  key
}) => {
  return (
    <>
      <div className={styles["div"]}>
        <input
          type="radio"
          ref={ref}
          className={className}
          onChange={onChange}
          onBlur={onBlur}
          defaultChecked={defaultChecked}
          name={name}
          id={id}
          required={required}
          value={value}
        />
        <label htmlFor={id}>{children}</label>
      </div>
    </>
  );
};

export default RadioInput;
