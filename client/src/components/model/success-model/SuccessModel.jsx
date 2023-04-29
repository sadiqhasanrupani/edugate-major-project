import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

import styles from "./SuccessModel.module.scss";
import Card from "../../UI/Card/Card";

const Model = ({ children, cardClassName }) => {
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo(
      ".success-card-model",
      { x: 500, y: "-1rem" },
      { x: "-1rem", ease: "power6" }
    );
    timeline.to(".success-card-model", {
      x: 1000,
      ease: "power6",
      delay: 2.5,
      duration: 3,
    });
  }, []);
  return (
    <Card className={`success-card-model ${styles["card"]} ${cardClassName}`}>
      <p>{children}</p>
    </Card>
  );
};

const SuccessModel = ({ children, cardClassName }) => {
  return (
    <>
      {createPortal(
        <Model children={children} cardClassName={cardClassName} />,
        document.querySelector("#model-root")
      )}
    </>
  );
};

export default SuccessModel;
