import React, { Fragment, useEffect, useState } from "react";
import { json } from "react-router-dom";

import styles from "../../../scss/components/student/subroot/StudentJoinClassroomFooter.module.scss";

//^ auth
import { getAuthToken } from "../../../utils/auth";

const StudentJoinClassroomFooter = ({ classroomId }) => {
  const [studentsData, setStudentsData] = useState([]);

  //^ this useEffect will fetch the students data according to their respective classroom.
  useEffect(() => {
    const getJoinClassroomStudents = async () => {
      const joinClassroomStudents = await fetch(
        `${process.env.REACT_APP_HOSTED_URL}/get-join-classroom-students?classId=${classroomId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      if (!joinClassroomStudents.ok) {
        throw json({ message: "Internal server error" }).status(500);
      }

      setStudentsData(await joinClassroomStudents.json());
    };

    getJoinClassroomStudents();
  }, []);

  //^ creating a student slice images array where their will be only 0 to 3 images of array.
  const studentSliceImages = studentsData.slice(0, 3);
  const studentsDataLength = studentsData.length;

  return (
    <>
      <footer className={styles["footer"]}>
        <div className={styles["profile"]}>
          {studentSliceImages.map((studentData) => {
            return (
              <Fragment key={studentData.student.student_id}>
                <img
                  src={studentData.student.student_img}
                  alt="student-profile-img"
                />
              </Fragment>
            );
          })}
          {studentsDataLength > 3 && <span>+{studentsDataLength - 3}</span>}
        </div>
      </footer>
    </>
  );
};

export default StudentJoinClassroomFooter;
