import React, { Fragment, useEffect, useState } from "react";

//^ styles
import styles from "./QuizFooter.module.scss";

//^ auth
import { getAuthToken } from "../../../../../../../utils/auth";

//^ component
import AddBtnOne from "../../../../../../UI/Icons/AddIconTwo";
import DarkAddIcon from "../../../../../../UI/Icons/Dark/DarkAddIcon";

const QuizFooter = ({ themeMode, quizId }) => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const getStudentData = async () => {
      const studentData = await fetch(
        `${process.env.REACT_APP_HOSTED_URL}/quiz/get-joined-students/${quizId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        },
      );
      if (!studentData.ok) {
        await studentData.json();
        // console.log(response);

        throw new Error({ message: "Something went wrong" });
      }

      const response = await studentData.json();
      setStudentsData(response.students);
    };
    getStudentData();
  }, []);

  const firstThreeStudentsData = studentsData
    .map((studentData) => studentData.student)
    .slice(0, 3);

  return (
    <>
      <div className={styles["quiz-footer"]}>
        <div className={styles["students-data"]}>
          {studentsData.length !== 0 ? (
            <>
              {firstThreeStudentsData.map((student) => {
                return (
                  <Fragment key={student.student_id}>
                    <img src={student.student_img} alt="student-profile" />
                  </Fragment>
                );
              })}
              {studentsData.length > 3 && (
                <span>+{studentsData.length - 3}</span>
              )}
            </>
          ) : themeMode ? (
            <DarkAddIcon />
          ) : (
            <AddBtnOne />
          )}
        </div>
      </div>
    </>
  );
};

export default QuizFooter;
