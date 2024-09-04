import React from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "../../../scss/components/student/NavBtn/NavBtn.module.scss";

const StudentNavBtn = ({
  children,
  ref,
  className,
  onClick,
  onBlur,
  to,
  relative,
  Icon,
  themeMode,
}) => {
  const isClassActive = ({ isActive }) =>
    isActive ? styles.active : undefined;
  return (
    <>
      <NavLink to={to} relative={relative} className={isClassActive}>
        <span
          className={`${styles["link-btn"]} ${
            themeMode ? styles["dark-link-btn"] : undefined
          }`}
        >
          <div
            ref={ref}
            className={`${styles["nav-btn"]}`}
            onClick={onClick}
            onBlur={onBlur}
          >
            <Icon />
            {children}
          </div>
        </span>
      </NavLink>
    </>
  );
};

export default StudentNavBtn;
