import { useSelector } from "react-redux";

//^ stylesheet
import styles from "../../scss/components/teacher/Classrooms/SubjectCard.module.scss";

//^ components
import SecondaryCard from "../UI/Card/CardSecondary";
import SubjectHeader from "./SubjectHeader";
import SubjectFooter from "./SubjectFooter";

const SubjectCard = ({ subjectName, subjectId }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <article className={`${styles["article"]}`}>
      <SecondaryCard className={styles["secondary-card"]}>
        <SubjectHeader
          subjectId={subjectId}
          subjectName={subjectName}
          themeMode={themeMode}
        />
        <SubjectFooter />
      </SecondaryCard>
    </article>
  );
};

export default SubjectCard;
