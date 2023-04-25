import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

import styles from "./FormPortal.module.scss";

//* light icons
import CloseBtn from "../UI/Icons/CloseIcon";

//* dark icons
import DarkCloseBtn from "../UI/Icons/Dark/DarkCloseIcon";

//* components
import Card from "../UI/Card/Card";

export const Backdrop = ({ onClick }) => {
  return <div className={styles["backdrop"]} onClick={onClick} />;
};

export const Model = ({
  children,
  articleClassName,
  cardClassName,
  modelTitle,
  buttonOnClick,
  method,
  action,
  encType,
  formOnSubmit,
  formOnClick,
  formOnBlur,
  formOnChange,
  formClassName,
}) => {
  const themeMode = JSON.parse(localStorage.getItem("theme"));

  useEffect(() => {
    gsap.fromTo(".article", { scale: 0 }, { scale: 1, ease: "power4" });
  }, []);

  return (
    <>
      <article
        className={`article ${styles["overlay"]} ${articleClassName} ${
          themeMode && styles["dark"]
        }`}
      >
        <Card className={`${styles["card"]} ${cardClassName}`}>
          <header>
            <h1>{modelTitle}</h1>
            <button onClick={buttonOnClick} type="button">
              {themeMode ? <DarkCloseBtn /> : <CloseBtn />}
            </button>
          </header>
          <main>
            <form
              onSubmit={formOnSubmit}
              // method={method}
              // action={action}
              encType={encType}
              onClick={formOnClick}
              onBlur={formOnBlur}
              onChange={formOnChange}
              className={formClassName}
            >
              {children}
            </form>
          </main>
        </Card>
      </article>
    </>
  );
};

const Portal = ({
  children,
  onBackdrop,
  articleClassName,
  cardClassName,
  modelTitle,
  buttonOnClick,
  method,
  action,
  encType,
  formOnSubmit,
  formOnClick,
  formOnBlur,
  formOnChange,
  formClassName,
}) => {
  return (
    <>
      {createPortal(
        <Backdrop onClick={onBackdrop} />,
        document.querySelector("#backdrop-root")
      )}
      {createPortal(
        <Model
          children={children}
          articleClassName={articleClassName}
          cardClassName={cardClassName}
          modelTitle={modelTitle}
          buttonOnClick={buttonOnClick}
          method={method}
          action={action}
          encType={encType}
          formOnSubmit={formOnSubmit}
          formOnClick={formOnClick}
          formOnBlur={formOnBlur}
          formOnChange={formOnChange}
          formClassName={formClassName}
        />,
        document.querySelector("#model-root")
      )}
    </>
  );
};

export default Portal;
