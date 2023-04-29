//^ dependencies
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { json } from "react-router-dom";

//^ stylesheet
import styles from "../../scss/components/teacher/Classrooms/SubjectCard.module.scss";

//^ components
import SecondaryCard from "../UI/Card/CardSecondary";
import SubjectHeader from "./SubjectHeader";
import SubjectFooter from "./SubjectFooter";

//^ auth
import { getAuthToken } from "../../utils/auth";

const SubjectCard = ({ subjectName, subjectId, redirectURL }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ using useStates
  const [teachersData, setTeacherData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);

  //^ using this useEffect to get the respected join-subject teachers and student images.
  useEffect(() => {
    //^ A function which can get the joined subject teachers and students images data.
    const getJoinSubjectsMember = async () => {
      const getJoinSubjectTeachersStudents = await fetch(
        `${process.env.REACT_APP_HOSTED_URL}/subject/get-join-subject-teachers-students/${subjectId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      if (!getJoinSubjectTeachersStudents.ok) {
        throw json(
          { message: getJoinSubjectTeachersStudents.statusText },
          { status: getJoinSubjectTeachersStudents.status }
        );
      }

      const response = await getJoinSubjectTeachersStudents.json();

      setTeacherData(response.joinSubjectTeachersData);
      setStudentsData(response.joinSubjectStudentsData);
    };
    getJoinSubjectsMember();
  }, []);

  return (
    <article className={`${styles["article"]}`}>
      <SecondaryCard className={styles["secondary-card"]}>
        <SubjectHeader
          subjectName={subjectName}
          themeMode={themeMode}
          redirectURL={redirectURL}
        />
        <SubjectFooter
          teachersData={teachersData}
          studentsData={studentsData}
        />
      </SecondaryCard>
    </article>
  );
};

export default SubjectCard;
