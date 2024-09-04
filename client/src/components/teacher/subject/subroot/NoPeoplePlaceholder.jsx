import React from "react";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "../../../../scss/components/teacher/subject/subroot/NoPeoplePlaceholder.module.scss";

//^ components
import IconBtn from "../../../UI/Buttons/IconBtn";

//^ icons
import NoPeople from "../../../UI/Icons/subjectIcons/people-page/NoPeoples";
import DarkNoPeople from "../../../UI/Icons/subjectIcons/people-page/Dark/DarkNoPeople";
import AddBtnOne from "../../../UI/Icons/AddBtnOne";

const NoPeoplePlaceholder = ({ subjectName }) => {
  //^ getting the themeMode
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <article className={styles["article"]}>
      <div className={styles["no-people-div"]}>
        {themeMode ? <DarkNoPeople /> : <NoPeople />}

        <h3>No Peoples are there in {subjectName} subject</h3>
      </div>
    </article>
  );
};

export default NoPeoplePlaceholder;
