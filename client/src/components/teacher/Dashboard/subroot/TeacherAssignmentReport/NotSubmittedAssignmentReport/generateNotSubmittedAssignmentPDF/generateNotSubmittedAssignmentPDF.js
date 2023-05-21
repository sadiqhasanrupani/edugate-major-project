import jsPDF from "jspdf";
import "jspdf-autotable";
import formattedDateTime from "../../../../../../../utils/formatted-date-time";

// define a generatePDF function that accepts a student argument
const generateNotSubmittedAssignmentPDF = (
  joinedAssignmentData,
  AssignmentName,
  ClassroomName,
  SubjectName
) => {
  // initialize jsPDF
  const doc = new jsPDF();
  let count = 1;

  // define the columns we want and their titles
  const tableColumn = [
    "Student ID",
    "Name",
    "Email ID",
    "Due Date",
    "Subject",
    "Classroom",
  ];
  // define an empty array of rows
  const tableRows = [];

  // Filter out the data where submitted_assignment_id is falsy
  const notSubmittedAssignments = joinedAssignmentData.filter(
    (joinAssignment) => !joinAssignment.submitted_assignment_id
  );

  console.log(notSubmittedAssignments);

  // for each assignment, pass the necessary data into an array
  notSubmittedAssignments.forEach((assignment) => {
    const dueDate = formattedDateTime(assignment.assignment.end_date);

    let subjectData = [
      assignment.id,
      `${assignment.student.student_first_name} ${assignment.student.student_last_name}`,
      assignment.student.student_email,
      assignment.assignment.end_date ? dueDate : "No Due",
      assignment.subject.subject_name,
      assignment.subject.classroom.classroom_name,
    ];

    // push each assignment's info into a row
    tableRows.push(subjectData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // teacher title. and margin-top + margin-left
  doc.text(
    `Total Students inside the ${AssignmentName}\nAssignment of ${SubjectName} Subject inside ${ClassroomName} Classroom.`,
    14,
    10
  );
  // we define the name of our PDF file.
  doc.save(`${AssignmentName}_report_${dateStr}.pdf`);
};

export default generateNotSubmittedAssignmentPDF;
