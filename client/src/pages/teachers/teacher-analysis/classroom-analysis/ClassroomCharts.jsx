import React from "react";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "./ClassroomChart.module.scss";

//^ components
import PieChart from "../../../../components/Charts/PieChart/PieChart";
import UnderLine from "../../../../components/UI/underline/UnderLine";
import TeacherChart from "./teacher-chart/TeacherChart";
import StudentChart from "./student-chart/StudentChart.jsx";

const ClassroomPieChart = ({ teachersData, studentsData }) => {
  const themeMode = useSelector(state => state.ui.isDarkMode)
  const teacherCount = teachersData.length;
  const studentCount = studentsData.length;

  const data = {
    labels: ["Teachers", "Students"],
    datasets: [
      {
        data: [teacherCount, studentCount],
        backgroundColor: ["#7959FD", "#FF6384"],
        hoverBackgroundColor: ["#7b5afd", "#FF6384"],
      },
    ],
  };

  return (
    <div className={styles["classroom-pie-chart"]}>
      <h2>Classroom Composition</h2>
      <UnderLine themeMode={themeMode} />
      <div className={styles["charts"]}>
        <div className={styles["description"]}>
          <h4>Number of Teachers and Students in the Classroom</h4>
          <div className={styles["pie"]}>
            <PieChart data={data} />
          </div>
        </div>
        <div className={styles["description"]}>
          <h4>Teachers Joined per Month</h4>
          <div className={styles["bar-chart"]}>
            <TeacherChart teachersData={teachersData} />
          </div>
        </div>
        <div className={styles["line-chart"]}>
          <h4>Students Joined per Month</h4>
          <StudentChart studentsData={studentsData} />
        </div>
      </div>
    </div>
  );
};

export default ClassroomPieChart;
