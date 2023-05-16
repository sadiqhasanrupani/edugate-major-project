import React from "react";

//^ stylesheet
import styles from "./ClassroomChart.module.scss";

//^ components
import PieChart from "../../../../components/Charts/PieChart/PieChart";
import UnderLine from "../../../../components/UI/underline/UnderLine";
import TeacherChart from "./teacher-chart/TeacherChart";
import StudentChart from "./student-chart/StudentChart.jsx";

const ClassroomPieChart = ({ teachersData, studentsData }) => {
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
      <UnderLine />
      <div className={styles["charts"]}>
        <div className={styles["pie"]}>
          <PieChart data={data} />
        </div>
        <div className={styles["bar-chart"]}>
          <TeacherChart teachersData={teachersData} />
        </div>
        <div className={styles["line-chart"]}>
          <StudentChart studentsData={studentsData} />
        </div>
      </div>
    </div>
  );
};

export default ClassroomPieChart;
