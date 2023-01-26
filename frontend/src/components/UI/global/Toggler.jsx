import React from "react";
import { useDispatch } from "react-redux";

import styles from "../../../scss/global/Toggler.module.scss";

import { uiAction } from "../../../store/ui-slice";

const Toggler = () => {
  const dispatch = useDispatch();

  const themeTogglerHandler = () => {
    dispatch(uiAction.themeToggler());
  };

  return (
    <>
      <input
        type="checkbox"
        name="check"
        id="check"
        className={styles.toggler}
        onClick={themeTogglerHandler}
      />
      <label htmlFor="check"></label>
    </>
  );
};

export default Toggler;
