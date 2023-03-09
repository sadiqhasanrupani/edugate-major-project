import React from "react";
import { createPortal } from "react-dom";
import Card from "../UI/Card/Card";
import { useSelector } from "react-redux";

import styles from "./ImagePortal.module.scss";

export const Backdrop = ({ onClick }) => {
  return <div className={styles["backdrop"]} onClick={onClick} />;
};

export const Model = ({ children, image }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  return (
    <>
      <article
        className={`${styles["overlay"]} ${themeMode && styles["dark"]}`}
      >
        <img src={image} alt="pic-profile-img" />
      </article>
    </>
  );
};

const ImagePortal = ({ children, onBackdrop, image }) => {
  return (
    <>
      {createPortal(
        <Backdrop onClick={onBackdrop} />,
        document.querySelector("#backdrop-root")
      )}
      {createPortal(
        <Model children={children} image={image} />,
        document.querySelector("#model-root")
      )}
    </>
  );
};

export default ImagePortal;
