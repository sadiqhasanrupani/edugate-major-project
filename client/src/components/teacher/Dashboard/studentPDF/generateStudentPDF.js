import jsPDF from "jspdf";
import "jspdf-autotable";
import formattedDateTime from "../../../../utils/formatted-date-time";

// define a generatePDF function that accepts a student argument
const generateStudentPDF = (students, classroomName) => {
  // initialize jsPDF
  const doc = new jsPDF();
  let count = 1;

  // define the columns we want and their titles
  const tableColumn = [
    "Id",
    "First Name",
    "Last Name",
    "Email ID",
    "Phone No.",
    "DOB",
    "Joined Date",
  ];
  // define an empty array of rows
  const tableRows = [];

  // for each student pass all its data into an array
  students.forEach((student) => {
    const joinDate = formattedDateTime(student.createdAt);

    const studentData = [
      count++,
      student.student.student_first_name,
      student.student.student_last_name,
      student.student.student_email,
      student.student.student_phone_number,
      student.student.student_dob,
      joinDate,
    ];
    // push each students's info into a row
    tableRows.push(studentData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // teacher title. and margin-top + margin-left
  doc.text(`Total Students inside the ${classroomName} classroom.`, 14, 15);
  // we define the name of our PDF file.
  doc.save(`${classroomName}_report_${dateStr}.pdf`);
};

export default generateStudentPDF;
