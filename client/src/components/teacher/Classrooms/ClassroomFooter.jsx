import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// styles
import styles from "../../../scss/components/teacher/Classrooms/ClassroomFooter.module.scss";

// components
import Teachers from "../Teachers";
import Students from "../Student";

//* utils
import { getAuthToken } from "../../../utils/auth";
import { json } from "react-router-dom";

const ClassroomFooter = ({ classId }) => {
  const [studentsData, setStudentsData] = useState([]);
  const [teachersData, setTeacherData] = useState([]);

  //* themeMode
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    const getTeachers = async () => {
      //* Fetching Teachers data from this url
      const url1 = `${process.env.REACT_APP_HOSTED_URL}/classroom/getJoinedClassroomTeachers?classId=${classId}`;

      const response = await fetch(url1, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw json({ message: "Something went wrong" }, { status: 500 });
      }

      const resData = await response.json();
      setTeacherData(resData.TeacherJoinClassroomData.rows);
    };

    const getStudents = async () => {
      //* Fetching Students data from this url
      const url = `${process.env.REACT_APP_HOSTED_URL}/classroom/getJoinedClassroomStudents?classId=${classId}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw json({ message: "Something went wrong" }, { status: 500 });
      }

      const resData = await response.json();
      setStudentsData(resData.studentsData.rows);
    };

    //* Calling the functions
    getTeachers();
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
    <div className={styles["classroom-footer"]}>
      <div className={`${styles["profiles"]}`}>
        <Students
          isStudentData={isStudentData}
          filteredStudentsImg={filteredStudentsImg}
          sliceFilteredStudentsImg={sliceFilteredStudentsImg}
          themeMode={themeMode}
        />
        {filteredStudentsImgLength > 3 && (
          <span>+{filteredStudentsImgLength - 3}</span>
        )}
      </div>
      <div className={styles["profiles"]}>
        <Teachers
          isTeachersData={isTeachersData}
          filteredTeachersImg={filteredTeacherImg}
          sliceFilteredTeachersImg={sliceFilteredTeachersImg}
          themeMode={themeMode}
        />
        {filteredTeachersImgLength > 3 && (
          <span>+{filteredTeachersImgLength - 3}</span>
        )}
      </div>
    </div>
  );
};

export default ClassroomFooter;
