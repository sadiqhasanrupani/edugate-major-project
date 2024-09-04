import React from "react";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "./ClassroomChart.module.scss";

//^ components
import PieChart from "../../../../components/Charts/PieChart/PieChart";
import UnderLine from "../../../../components/UI/underline/UnderLine";
import TeacherChart from "./teacher-chart/TeacherChart";
import StudentChart from "./student-chart/StudentChart.jsx";
import SubjectLineChart from "./subject-chart/SubjectLineChart";

const ClassroomPieChart = ({
  teachersData,
  studentsData,
  compulsorySubjects,
  optionalSubjects,
  compulsoryCount,
  optionalCount,
}) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
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
    <div
      className={`${styles["classroom-pie-chart"]} ${themeMode && styles.dark}`}
    >
      <div className={styles["classroom-graph-title"]}>
        <h2>Classroom Composition</h2>
      </div>
      <UnderLine themeMode={themeMode} />
      <div className={styles["charts"]}>
        <div className={styles["description"]}>
          <h4>Number of Teachers and Students in the Classroom</h4>
          <div className={styles["pie"]}>
            <PieChart data={data} className={styles["pie-chart"]} />
          </div>
        </div>
        <div className={styles["description"]}>
          <h4>Teachers Joined per Month</h4>
          <div className={styles["bar-chart"]}>
            <TeacherChart
              teachersData={teachersData}
              className={styles["bar"]}
              themeMode={themeMode}
            />
          </div>
        </div>
        <div className={styles["line-chart"]}>
          <h4>Students Joined per Month</h4>
          <StudentChart studentsData={studentsData} themeMode={themeMode} />
        </div>
        <div className={styles["line-chart"]}>
          <h4>Compulsory Subject VS Optional Subject</h4>
          <SubjectLineChart
            compulsorySubjectsData={compulsorySubjects}
            optionalSubjectsData={optionalSubjects}
            compulsoryCount={compulsoryCount}
            optionalCount={optionalCount}
            themeMode={themeMode}
          />
        </div>
      </div>
    </div>
  );
};

export default ClassroomPieChart;
