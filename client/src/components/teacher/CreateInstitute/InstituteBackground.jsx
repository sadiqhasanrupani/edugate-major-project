import React from "react";
import { Form } from "react-router-dom";

import styles from "../../../scss/components/teacher/CreateInstitute/InstituteForm.module.scss";

// institute-background-img-placeholder
import InstituteBackgroundImg from "../../../assets/Images/Institute/institute-background-img.png";

// UI
import EditBtnBig from "../.././UI/Icons/EditBtnBig";

const InstituteBackground = () => {
  return (
    <>
      <article className={styles.article}>
        <Form method="POST">
          <div className="institute-div">
            <img src={InstituteBackgroundImg} alt="institute-background" />
            <label htmlFor="institute-background">
              <EditBtnBig />
            </label>
            <input
              type="file"
              id="institute-background"
              name="institute-background"
            />
          </div>
        </Form>
      </article>
    </>
  );
};

export default InstituteBackground;
