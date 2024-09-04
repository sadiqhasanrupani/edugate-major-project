import jsPDF from "jspdf";
import "jspdf-autotable";
import formattedDateTime from "../../../../../../utils/formatted-date-time";

// define a generatePDF function that accepts a teachers argument
const generateTeacherPDF = (teachers, subjectName) => {
  // initialize jsPDF
  const doc = new jsPDF();
  let count = 1;

  // define the columns we want and their titles
  const tableColumn = [
    "Id",
    "First Name",
    "Last Name",
    "Email ID",
    "Phone no.",
    "DOB",
    "Joined Date",
  ];
  // define an empty array of rows
  const tableRows = [];

  // for each teacher pass all its data into an array
  teachers.forEach((teacher) => {
    console.log(teacher);
    const joinDate = formattedDateTime(teacher.createdAt);

    const teacherData = [
      count++,
      teacher.coTeacher.teacher_first_name,
      teacher.coTeacher.teacher_last_name,
      teacher.coTeacher.teacher_email,
      teacher.coTeacher.teacher_phone_number,
      teacher.coTeacher.teacher_dob,
      joinDate,
    ];
    // push each teachers's info into a row
    tableRows.push(teacherData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // teacher title. and margin-top + margin-left
  doc.text(`Total Teachers inside the ${subjectName} subject`, 14, 15);
  // we define the name of our PDF file.
  doc.save(`${subjectName}_report_${dateStr}.pdf`);
};

export default generateTeacherPDF;
