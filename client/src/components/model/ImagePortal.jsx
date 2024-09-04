import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

import styles from "./ImagePortal.module.scss";

export const Backdrop = ({ onClick }) => {
  return <div className={styles["backdrop"]} onClick={onClick} />;
};

export const Model = ({ children, image }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    gsap.fromTo(".image-overlay", { scale: 0 }, { scale: 1, ease: "linear" });
  }, []);
  return (
    <>
      <article
        className={`image-overlay ${styles["overlay"]} ${
          themeMode && styles["dark"]
        }`}
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
