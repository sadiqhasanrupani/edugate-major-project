import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

import styles from "./NewErrorModel.module.scss";

import Card from "../../../UI/Card/Card";
import CloseButton from "../../../UI/CloseButton/CloseButton";

const Model = ({ children, cardClassName, onCloseBtn }) => {
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo(
      ".success-card-model",
      { x: 500, y: "-1rem" },
      { x: "-1rem", ease: "power6" }
    );
  }, []);

  return (
    <Card className={`success-card-model ${styles["card"]} ${cardClassName}`}>
      <div className={styles["model-content"]}>
        <div className={styles["close-btn"]} onClick={onCloseBtn}>
          <CloseButton />
        </div>
        {children}
      </div>
    </Card>
  );
};

const newErrorMode = ({ cardClassName, onCloseBtn, children }) => {
  return createPortal(
    <Model cardClassName={cardClassName} onCloseBtn={onCloseBtn}>
      {children}
    </Model>,
    document.querySelector("#model-root")
  );
};

export default newErrorMode;
