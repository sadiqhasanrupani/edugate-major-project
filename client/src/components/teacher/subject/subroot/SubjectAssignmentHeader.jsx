import React from "react";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "../../../../scss/components/teacher/subject/subroot/TeacherSubjectAssignment.module.scss";

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
}) => {
  const themeMode = useSelector(state => state.ui.isDarkMode);
  
  //^ formatting the dueDate
  const { formattedDate } = useMonthDay(dueDate);

  return (
    <>
      <article className={styles["article"]}>
        <div>
          <h2>{topic}</h2>
          <button>{themeMode ? <DarkMenu /> : <Menu />}</button>
        </div>
        <div>
          
        </div>
      </article>
    </>
  );
};

export default subjectAssignmentHeader;
