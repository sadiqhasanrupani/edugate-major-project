import jsPDF from "jspdf";
import "jspdf-autotable";
import formattedDateTime from "../../../../utils/formatted-date-time";

// define a generatePDF function that accepts a student argument
const generateSubjectPDF = (subjects, classroomName) => {
  // initialize jsPDF
  const doc = new jsPDF();
  let count = 1;

  // define the columns we want and their titles
  const tableColumn = [
    "Id",
    "Subject name",
    "Subject status",
    "Created By",
    "Created At",
  ];
  // define an empty array of rows
  const tableRows = [];

  // for each student pass all its data into an array
  subjects.forEach((subject) => {
    const createdAt = formattedDateTime(subject.createdAt);

    const subjectData = [
      count++,
      subject.subject_name,
      subject.subject_status,
      `${subject.teacher.teacher_first_name} ${subject.teacher.teacher_last_name}`,
      createdAt,
    ];
    // push each students's info into a row
    tableRows.push(subjectData);
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

export default generateSubjectPDF;
