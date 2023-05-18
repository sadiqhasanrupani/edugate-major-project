import React from "react";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "./ClassroomPDF.module.scss";

//^ components
import ClassroomReportTable from "../../../../../components/UI/Tables/classroom-report-table/ClassroomReportTable";
import PrimaryBtn from "../../../../../components/UI/Buttons/PrimaryBtn";
import UnderLine from "../../../../../components/UI/underline/UnderLine";
import SmallEmptyFolder from "../../../../../components/UI/Icons/EmptyFolder/SmallEmptyFolder";

//^ helper functions
import generateTeacherPDF from "../../../../../components/teacher/Dashboard/teacherPDF/generateTeacherPDF";
import generateStudentPDF from "../../../../../components/teacher/Dashboard/studentPDF/generateStudentPDF";

const ClassroomPDF = ({ classroomName, teachersData, studentsData }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const downloadPdfHandler = () => {
    generateTeacherPDF(teachersData, classroomName);
  };

  const studentReportDownloadHandler = () => {
    generateStudentPDF(studentsData, classroomName);
  };

  const HEADING_ITEMS = [
    { id: 1, title: "Teacher ID" },
    {
      id: 2,
      title: "First name",
    },
    {
      id: 3,
      title: "Last name",
    },
    {
      id: 4,
      title: "Teacher Email",
    },
  ];

  const HEADING_ITEMS_TWO = [
    {
      id: 5,
      title: "Teacher phone",
    },
    {
      id: 6,
      title: "Teacher DOB",
    },
    {
      id: 7,
      title: "Joined Date",
    },
  ];

  const STUDENT_HEADING_ITEMS = [
    {
      id: 1,
      title: "ID",
    },
    {
      id: 2,
      title: "First name",
    },

    {
      id: 3,
      title: "Last name",
    },
    {
      id: 4,
      title: "Email ID",
    },
  ];

  const STUDENT_HEADING_ITEMS_TWO = [
    {
      id: 1,
      title: "Phone no.",
    },
    {
      id: 2,
      title: "DOB",
    },

    {
      id: 3,
      title: "Joined date",
    },
  ];

  return (
    <div
      className={`${styles["classroom-pdf"]} ${themeMode && styles["dark"]}`}
    >
      <div className={styles["pdf-name"]}>
        <h1>{classroomName} classroom Report</h1>
        <UnderLine themeMode={themeMode} className={styles["underline"]} />
      </div>
      <div id="report-content" className={styles["report-content"]}>
        <div className={styles["report-title"]}>
          <h2>Joined Teachers</h2>
          <PrimaryBtn
            onClick={downloadPdfHandler}
            disabled={teachersData.length === 0}
          >
            Download PDF
          </PrimaryBtn>
        </div>
        <div>
          {teachersData.length === 0 ? (
            <div style={{ textAlign: "center" }}>
              <SmallEmptyFolder />
            </div>
          ) : (
            <ClassroomReportTable
              teachersData={teachersData}
              HEADING_ITEMS={HEADING_ITEMS}
              teacher={true}
              HEADING_ITEMS_TWO={HEADING_ITEMS_TWO}
            />
          )}
        </div>
      </div>

      <div className={styles["report-content"]}>
        <div className={styles["report-title"]}>
          <h2>Joined Students</h2>
          <PrimaryBtn
            onClick={studentReportDownloadHandler}
            disabled={studentsData.length === 0}
          >
            Download PDF
          </PrimaryBtn>
        </div>
        <div>
          {studentsData.length === 0 ? (
            <div style={{ textAlign: "center" }}>
              <SmallEmptyFolder />
            </div>
          ) : (
            <ClassroomReportTable
              studentsData={studentsData}
              HEADING_ITEMS={STUDENT_HEADING_ITEMS}
              student={true}
              HEADING_ITEMS_TWO={STUDENT_HEADING_ITEMS_TWO}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassroomPDF;
