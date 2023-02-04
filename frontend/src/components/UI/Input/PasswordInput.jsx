import { useState } from "react";

// styles
import styles from "../../../scss/components/Input/PasswordInput.module.scss";

// icons
import OpenEye from "../Icons/OpenEye";
import CloseEye from "../Icons/CloseEye";

const PasswordInput = ({
  ref,
  className,
  onChange,
  onClick,
  onBlur,
  name,
  id,
  placeholder,
  required,
  Icon,
  value,
}) => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const passwordHandler = () => {
    setIsEyeOpen(!isEyeOpen);
  };
  return (
    <section className={styles["input-model"]}>
      <div className={styles["input"]}>
        <input
          ref={ref}
          type={isEyeOpen ? "text" : "password"}
          className={`${styles["signup-input"]} ${className}`}
          onChange={onChange}
          onClick={onClick}
          onBlur={onBlur}
          name={name}
          id={id}
          placeholder={placeholder}
          required={required}
        />
      </div>
      <div className={styles["icon"]}>
        <Icon />
      </div>
      <div className={styles["eye-icon"]} onClick={passwordHandler}>
        {isEyeOpen ? <OpenEye /> : <CloseEye />}
      </div>
    </section>
  );
};

export default PasswordInput;
