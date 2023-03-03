import React from "react";

//* styles
import styles from "./SubjectHeader.module.scss"

//* icons
import Menu from "../../components/UI/Icons/More";

const SubjectHeader = ({ subjectName }) => {
  return (
    <div className={styles['subject-header']} >
      <div>
        <p>{subjectName}</p>
      </div>
      <div>
        <Menu />
      </div>
    </div>
  );
};

export default SubjectHeader;
