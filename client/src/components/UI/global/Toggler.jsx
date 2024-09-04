import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../../scss/global/Toggler.module.scss";

import { uiAction } from "../../../store/ui-slice";

const Toggler = () => {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const dispatch = useDispatch();

  const themeTogglerHandler = () => {
    dispatch(uiAction.themeToggler());
  };

  useEffect(() => {
    const localTheme = JSON.parse(localStorage.getItem("theme"));

    if (localTheme) {
      dispatch(uiAction.setDarkMode(localTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <>
      <input
        type="checkbox"
        name="check"
        id="check"
        className={styles.toggler}
        onChange={themeTogglerHandler}
        checked={isDarkMode}
      />
      <label htmlFor="check"></label>
    </>
  );
};

export default Toggler;
