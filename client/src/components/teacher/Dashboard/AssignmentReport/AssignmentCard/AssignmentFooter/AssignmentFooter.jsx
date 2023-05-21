import React, { Fragment, useEffect, useState } from "react";
import { json } from "react-router-dom";

import styles from "./AssignmentFooter.module.scss";

import AddBtnOne from "../../../../../UI/Icons/AddBtnOne";
import DarkAddBtnOne from "../../../../../UI/Icons/Dark/DarkAddIcon";

import { getAuthToken } from "../../../../../../utils/auth";

const AssignmentFooter = ({ assignmentID, themeMode }) => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const getAssignmentStudents = async () => {
      const assignmentStudents = await fetch(
        `${process.env.REACT_APP_HOSTED_URL}/join-assignment/join-assignment-students/${assignmentID}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      if (assignmentStudents.status === 401) {
        const response = await assignmentStudents.json();

        throw json(
          { message: response.message },
          { status: assignmentStudents.status }
        );
      }

      if (!assignmentStudents.ok) {
        throw json(
          { message: "Something went wrong" },
          { status: assignmentStudents.status }
        );
      }

      const response = await assignmentStudents.json();
      const { joinStudentAssignment } = response;
      setStudentsData(joinStudentAssignment);
    };
    getAssignmentStudents();
  }, []);

  const firstThreeStudentsData = studentsData
    .map((studentData) => studentData.student)
    .slice(0, 3);

  return (
    <>
      <div className={styles["assignment-footer"]}>
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
            <DarkAddBtnOne />
          ) : (
            <AddBtnOne />
          )}
        </div>
      </div>
    </>
  );
};

export default AssignmentFooter;
