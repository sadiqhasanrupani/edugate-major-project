import jsPDF from "jspdf";
import "jspdf-autotable";
import formattedDateTime from "../../../../../../utils/formatted-date-time";

//^ define a generatePDF function that accepts a student argument
const generateNotSubmittedAssignmentPDF = (
  submittedAssignmentData,
  AssignmentName,
  ClassroomName,
  SubjectName
) => {
  //^ initialize jsPDF
  const doc = new jsPDF();
  let count = 1;

  //^ define the columns we want and their titles
  const tableColumn = [
    "ID",
    "Name",
    "Grade",
    "Checked By",
    "status",
    "Submitted On",
  ];
  //^ define an empty array of rows
  const tableRows = [];

  //^ for each assignment, pass the necessary data into an array
  submittedAssignmentData.forEach((assignment) => {
    const submittedDate = formattedDateTime(assignment.submitted_on);

    let subjectData = [
      count++,
      `${assignment.student.student_first_name} ${assignment.student.student_last_name}`,
      `${assignment.grade ? assignment.grade : 0} / ${assignment.assignment.total_marks}`,
      assignment.teacher
        ? `${assignment.teacher.teacher_first_name} ${assignment.teacher.teacher_last_name}`
        : "-",
      assignment.teacher ? "Checked" : "Pending",
      submittedDate,
    ];

    //^ push each assignment's info into a row
    tableRows.push(subjectData);
  });

  //^ startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  //^ we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  //^ teacher title. and margin-top + margin-left
  doc.text(
    `Total Students inside the ${AssignmentName}\nAssignment of ${SubjectName} Subject inside ${ClassroomName} Classroom.`,
    14,
    10
  );
  //^ we define the name of our PDF file.
  doc.save(`${AssignmentName}_report_${dateStr}.pdf`);
};

export default generateNotSubmittedAssignmentPDF;
