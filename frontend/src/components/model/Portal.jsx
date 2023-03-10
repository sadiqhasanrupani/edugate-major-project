import React from "react";
import { createPortal } from "react-dom";
import Card from "../UI/Card/Card";
import { useSelector } from "react-redux";

import styles from "./Portal.module.scss";

export const Backdrop = ({ onClick }) => {
  return <div className={styles["backdrop"]} onClick={onClick} />;
};

export const Model = ({ children }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  return (
    <>
      <article
        className={`${styles["overlay"]} ${themeMode && styles["dark"]}`}
      >
        <Card className={styles["card"]}>{children}</Card>
      </article>
    </>
  );
};

const Portal = ({ children, onBackdrop }) => {
  return (
    <>
      {createPortal(
        <Backdrop onClick={onBackdrop} />,
        document.querySelector("#backdrop-root")
      )}
      {createPortal(
        <Model children={children} />,
        document.querySelector("#model-root")
      )}
    </>
  );
};

export default Portal;
