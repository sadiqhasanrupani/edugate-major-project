import React from "react";
import { useSelector } from "react-redux";

import cancelStyle from "../../../scss/components/Buttons/CancelBtn.module.scss";

const CancelBtn = ({
  children,
  className,
  onClick,
  onBlur,
  onChange,
  ref,
  styles,
  type,
  formEncType,
  disabled,
}) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <button
      ref={ref}
      className={`${cancelStyle["cancel-btn"]} ${
        themeMode && cancelStyle["dark"]
      } ${className}`}
      onClick={onClick}
      onBlur={onBlur}
      onChange={onChange}
      style={styles}
      type={type}
      formEncType={formEncType}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CancelBtn;
