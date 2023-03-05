import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";

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
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  return (
    <>
      <article className={`${styles["overlay"]} ${articleClassName}`}>
        <Card className={`${styles["card"]} ${cardClassName}`}>
          <header>
            <h1>{modelTitle}</h1>
            <button onClick={buttonOnClick}>
              {themeMode ? DarkCloseBtn : <CloseBtn />}
            </button>
          </header>
          <main>
            <Form
              onSubmit={formOnSubmit}
              method={method}
              action={action}
              encType={encType}
              onClick={formOnClick}
              onBlur={formOnBlur}
              onChange={formOnChange}
              className={formClassName}
            >
              {children}
            </Form>
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
