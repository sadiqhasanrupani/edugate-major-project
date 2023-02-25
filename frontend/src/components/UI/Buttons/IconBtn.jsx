import React from "react";

import styles from "../../../scss/components/Buttons/IconBtn.module.scss";

const IconBtn = ({ children, onClick, ref, type, onBlur, Icon }) => {
  return (
    <>
      <div className={styles["icon-btn"]}>
        <button ref={ref} type={type} onBlur={onBlur} onClick={onClick}>
          <div>
            <Icon />
            <p>{children}</p>
          </div>
        </button>
      </div>
    </>
  );
};

export default IconBtn;
