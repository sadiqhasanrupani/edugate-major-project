import React from "react";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "../../../../scss/components/teacher/subject/subroot/TeacherSubjectAssignment.module.scss";

//^ components
import DueDate from "../../../../components/teacher/subject/assignment/subroot/due-date/DueData";
import UnderLine from "../../../../components/UI/underline/UnderLine";

//^ light icons
import AssignmentIcon from "../../../UI/Icons/subjectIcons/AssignmentIcon";
import Menu from "../../../UI/Icons/More";

//^ dark icons
import DarkAssignmentIcon from "../../../UI/Icons/subjectIcons/Dark/AssignmentIcon";
import DarkMenu from "../../../UI/Icons/Dark/DarkMenu";

//^ hooks
import useMonthDay from "../../../../hooks/use-month-day";

const subjectAssignmentHeader = ({
  topic,
  description,
  dueDate,
  assignmentId,
  show,
}) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ formatting the dueDate
  const { formattedDate } = useMonthDay(dueDate);

  const capitalDescription =
    description.charAt(0).toUpperCase() + description.slice(1).toLowerCase();

  return (
    <>
      <article
        className={`${styles["article"]} ${themeMode && styles["dark"]}`}
      >
        <div className={`${styles["flex"]} ${styles["assignment-heading"]}`}>
          <h2>{topic}</h2>
          {show && <button>{themeMode ? <DarkMenu /> : <Menu />}</button>}
        </div>
        <div
          className={`${styles["flex"]} ${styles["assignment-description"]}`}
        >
          <p>{description ? capitalDescription : "No Description"}</p>
          <DueDate date={formattedDate} dueDate={dueDate} />
        </div>
        <UnderLine themeMode={themeMode}/>
      </article>
    </>
  );
};

export default subjectAssignmentHeader;
