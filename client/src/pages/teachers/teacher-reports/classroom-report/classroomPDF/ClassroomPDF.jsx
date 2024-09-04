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
import generateSubjectPDF from "../../../../../components/teacher/Dashboard/subjectPDF/generateSubjectPDF";

const ClassroomPDF = ({
  classroomName,
  teachersData,
  studentsData,
  compulsorySubjects,
  optionalSubjects,
}) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const downloadPdfHandler = () => {
    generateTeacherPDF(teachersData, classroomName);
  };

  const studentReportDownloadHandler = () => {
    generateStudentPDF(studentsData, classroomName);
  };

  const compulsorySubjectDownloadHandler = () => {
    generateSubjectPDF(compulsorySubjects, classroomName);
  };

  const optionalSubjectDownloadHandler = () => {
    generateSubjectPDF(optionalSubjects, classroomName);
  };

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
            <ClassroomReportTable teachersData={teachersData} teacher={true} />
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
            <ClassroomReportTable studentsData={studentsData} student={true} />
          )}
        </div>
      </div>
      <div className={styles["report-content"]}>
        <div className={styles["report-title"]}>
          <h2>Compulsory Subjects</h2>
          <PrimaryBtn
            onClick={compulsorySubjectDownloadHandler}
            disabled={compulsorySubjects.length === 0}
          >
            Download PDF
          </PrimaryBtn>
        </div>
        <div>
          {compulsorySubjects.length !== 0 ? (
            <ClassroomReportTable
              compulsorySubjectsData={compulsorySubjects}
              compulsorySubject={true}
            />
          ) : (
            <div style={{ textAlign: "center" }}>
              <SmallEmptyFolder />
            </div>
          )}
        </div>
      </div>
      <div className={styles["report-content"]}>
        <div className={styles["report-title"]}>
          <h2>Optional Subjects</h2>
          <PrimaryBtn
            onClick={optionalSubjectDownloadHandler}
            disabled={optionalSubjects.length === 0}
          >
            Download PDF
          </PrimaryBtn>
        </div>
        <div>
          {optionalSubjects.length !== 0 ? (
            <ClassroomReportTable
              optionalSubjectsData={optionalSubjects}
              optionalSubjects={true}
            />
          ) : (
            <div style={{ textAlign: "center" }}>
              <SmallEmptyFolder />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassroomPDF;
