import React, { useEffect } from "react";
import { gsap } from "gsap";

import styles from "./EdugateLoadingAnimation.module.scss";

//^ component
import EdugateDarkMode from "../../logo/EdugateDarkMode";
import EdugateLightMode from "../../logo/EdugateLightMode";
import LoadingAnimation from "../../loading/LoadingAnimation/LoadingAnimation";

const EdugateLoadingAnimation = ({ themeMode }) => {
  useEffect(() => {
    const timeLine = gsap.timeline();
    const interval = setInterval(() => {
      timeLine.to(".edugate-loading-animation", { opacity: 0}, );

      timeLine.from(".edugate-loading-animation", {
        opacity: 1,
        ease: "linear",
      });
    }, 0);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`${styles["loading-animation"]}`}>
      <div className={`edugate-loading-animation ${styles["edugate-logo"]}`}>
        {themeMode ? <EdugateDarkMode /> : <EdugateLightMode />}
      </div>
      <LoadingAnimation />
    </div>
  );
};

export default EdugateLoadingAnimation;
