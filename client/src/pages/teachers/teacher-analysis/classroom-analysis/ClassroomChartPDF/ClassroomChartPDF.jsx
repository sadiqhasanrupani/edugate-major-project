import React from "react";
import { Page, Document, StyleSheet } from "@react-pdf/renderer";

import PieChart from "../../../../../components/Charts/PieChart/PieChart";

import TeacherBarChart from "../teacher-chart/TeacherChart";
import StudentChart from "../student-chart/StudentChart";
import SubjectLineChart from "../subject-chart/SubjectLineChart";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  chartContainer: {
    marginBottom: 20,
  },
});

const ClassroomChartPDF = ({
  teachersData,
  studentsData,
  compulsorySubjects,
  optionalSubjects,
  compulsoryCount,
  optionalCount,
}) => {
  return (
    <Document>
      <Page style={styles.page}>
        <h1 style={styles.title}>Classroom Composition</h1>
        <div style={styles.chartContainer}>
          <h2>Number of Teachers and Students in the Classroom</h2>
          <PieChart data={data} />
        </div>
        <div style={styles.chartContainer}>
          <h2>Teachers Joined per Month</h2>
          <TeacherBarChart teachersData={teachersData} />
        </div>
        <div style={styles.chartContainer}>
          <h2>Students Joined per Month</h2>
          <StudentChart studentsData={studentsData} />
        </div>
        <div style={styles.chartContainer}>
          <h2>Compulsory Subject VS Optional Subject</h2>
          <SubjectLineChart
            compulsorySubjectsData={compulsorySubjects}
            optionalSubjectsData={optionalSubjects}
            compulsoryCount={compulsoryCount}
            optionalCount={optionalCount}
          />
        </div>
      </Page>
    </Document>
  );
};

export default ClassroomChartPDF;
