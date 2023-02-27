import React from "react";

import styles from "../../../scss/pages/teacher/CreateInstitute.module.scss";

// components
import InstituteForm from "../../../components/teacher/CreateInstitute/InstituteForm.jsx";

const CreateInstitute = () => {
  return (
    <>
      <section className={styles.section}>
        <InstituteForm />
      </section>
    </>
  );
};

export default CreateInstitute;
