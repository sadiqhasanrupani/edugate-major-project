import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//* styles
import styles from "./JoinClassFooter.module.scss";

//* utils
import { getAuthToken } from "../../../utils/auth";

//* components
import Teachers from "../Teachers";
import Students from "../Student";

const JoinClassFooter = ({ ClassroomData }) => {
  //* themeMode which I'm grabbing from ui-slice.js file
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //* useStates
  const [teachersData, setTeachersData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    //* Request 1
    const url = new URL(
      `${process.env.REACT_APP_HOSTED_URL}/classroom/getJoinedClassroomTeachers?classId=${ClassroomData.classroom_id}`
    );

    //* Function to send the request
    const getTeachers = async () => {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      const resData = await response.json();
      setTeachersData(resData.TeacherJoinClassroomData.rows);
    };

    //* Calling above function
    getTeachers();

    //* Request 2
    const url2 = new URL(
      `${process.env.REACT_APP_HOSTED_URL}/classroom/getJoinedClassroomStudents?classId=${ClassroomData.classroom_id}`
    );

    //* function to send the request
    const getStudents = async () => {
      const response2 = await fetch(url2, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      const resData = await response2.json();
      setStudentsData(resData.studentsData.rows);
    };

    //* Calling above function
    getStudents();
  }, []);

  //& Student Section ------------------------------------------------

  //* Getting a boolean value when the data student object having "null" value
  const isStudentData = studentsData.some((studentData) => {
    return studentData.student !== null;
  });

  //* Getting the studentsImg array.
  const studentsImg = studentsData.map((studentData) => {
    return (
      studentData && studentData.student && studentData.student.student_img
    );
  });

  //* Filtering the studentsImg mapped array
  const filteredStudentsImg = studentsImg.filter((studentImg) => studentImg);
  const filteredStudentsImgLength = filteredStudentsImg.length;

  //* Slicing the filteredImg's to 0 to 3
  const sliceFilteredStudentsImg = filteredStudentsImg.slice(0, 3);

  //& ---------------------------------------------------------------

  //& Teacher Section -----------------------------------------------

  //* Getting a boolean value when the data student object having "null" value
  const isTeachersData = teachersData.some((teacherData) => {
    return teacherData.coTeacher !== null;
  });

  //* Getting the TeachersImg array.
  const teachersImg = teachersData.map((teacherData) => {
    return (
      teacherData && teacherData.coTeacher && teacherData.coTeacher.teacher_img
    );
  });

  //* Filtering the teachersImg array
  const filteredTeacherImg = teachersImg.filter((studentImg) => studentImg);
  const filteredTeachersImgLength = filteredTeacherImg.length;

  //* Slicing the filteredImg's to 0 to 3 array size
  const sliceFilteredTeachersImg = filteredTeacherImg.slice(0, 3);

  //& ---------------------------------------------------------------

  return (
    <div className={styles["join-class-footer"]}>
      <div>
        <Students
          studentsData={studentsData}
          isStudentData={isStudentData}
          filteredStudentsImg={filteredStudentsImg}
          sliceFilteredStudentsImg={sliceFilteredStudentsImg}
          themeMode={themeMode}
          studentsCount={filteredStudentsImgLength}
        />
      </div>
      <div>
        <Teachers
          teachersData={teachersData}
          isTeachersData={isTeachersData}
          filteredTeachersImg={filteredTeacherImg}
          sliceFilteredTeachersImg={sliceFilteredTeachersImg}
          themeMode={themeMode}
          teachersCount={filteredTeachersImgLength}
        />
      </div>
    </div>
  );
};

export default JoinClassFooter;
