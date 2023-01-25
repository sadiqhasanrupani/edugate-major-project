import React from "react";

import styles from "../../../scss/global/Toggler.module.scss";

const Toggler = () => {
  return (
    <>
      <input
        type="checkbox"
        name="check"
        id="check"
        className={styles.toggler}
      />
      <label htmlFor="check"></label>
    </>
  );
};

export default Toggler;
