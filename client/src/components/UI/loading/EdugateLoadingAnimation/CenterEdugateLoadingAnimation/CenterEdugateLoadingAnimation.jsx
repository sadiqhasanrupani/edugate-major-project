import React from "react";

import styles from "./CenterEdugateLoadingAnimation.module.scss";

import EdugateLoadingAnimation from "../EdugateLoadingAnimation";

const CenterEdugateLoadingAnimation = ({ themeMode }) => {
  return (
    <div className={styles['loading']}>
      <EdugateLoadingAnimation themeMode={themeMode} />
    </div>
  );
};

export default CenterEdugateLoadingAnimation;
