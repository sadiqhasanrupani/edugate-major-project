import jsPDF from "jspdf";
import "jspdf-autotable";
import formattedDateTime from "../../../../../../utils/formatted-date-time";

// define a generatePDF function that accepts a assignments argument
const generateTeacherPDF = (assignments, subjectName) => {
  // initialize jsPDF
  const doc = new jsPDF();
  let count = 1;

  // define the columns we want and their titles
  const tableColumn = [
    "Id",
    "Topic",
    "Description",
    "Total marks",
    "Created By",
    "Start",
    "End",
  ];
  // define an empty array of rows
  const tableRows = [];

  // for each teacher pass all its data into an array
  assignments.forEach((assignment) => {
    const startDate = formattedDateTime(assignment.assignment.start_date);
    const endDate = formattedDateTime(assignment.assignment.end_date);

    const assignmentsData = [
      count++,
      assignment.assignment.topic,
      assignment.assignment.description,
      assignment.assignment.total_marks,
      `${assignment.assignment.teacher.teacher_first_name} ${assignment.assignment.teacher.teacher_last_name}`,
      startDate,
      endDate,
    ];
    // push each assignments's info into a row
    tableRows.push(assignmentsData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // teacher title. and margin-top + margin-left
  doc.text(`Total assignments inside the ${subjectName} subject`, 14, 15);
  // we define the name of our PDF file.
  doc.save(`${subjectName}_report_${dateStr}.pdf`);
};

export default generateTeacherPDF;
