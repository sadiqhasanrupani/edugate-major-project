import React from "react";

import styles from "../../../scss/components/Input/SimpleInput.module.scss";

const SimpleInput = ({
  className,
  onChange,
  onBlur,
  ref,
  type,
  name,
  id,
  placeholder,
  required,
  onClick,
  Icon,
  value,
  defaultValue,
  inputmessage,
  hasError,
}) => {
  return (
    <div
      className={`${styles["simple-input-div"]} ${
        hasError && styles["is-valid"]
      } ${className}`}
    >
      <input
        ref={ref}
        type={type}
        className={`${styles["simple-input"]} `}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        name={name}
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        defaultValue={defaultValue}
      />

      <h6>{inputmessage}</h6>
    </div>
  );
};

export default SimpleInput;
