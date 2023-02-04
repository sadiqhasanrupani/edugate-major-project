import React from "react";

// styles
import styles from "../../../scss/components/Input/SignupInput.module.scss";

const SignupInput = ({
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
}) => {
  return (
    <>
      <section className={styles["input-model"]}>
        <div className={styles["input"]}>
          <input
            ref={ref}
            type={type}
            className={`${styles["signup-input"]} ${className}`}
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
        </div>
        <div className={styles["icon"]}>
          <Icon />
        </div>
      </section>
    </>
  );
};

export default SignupInput;
