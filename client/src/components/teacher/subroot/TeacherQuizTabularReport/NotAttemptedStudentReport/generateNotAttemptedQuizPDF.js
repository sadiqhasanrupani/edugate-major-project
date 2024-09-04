import jsPDF from "jspdf";
import "jspdf-autotable";
import formattedDateTime from "../../../../../utils/formatted-date-time";

//^ define a generatePDF function that accepts a student argument
const generateNotSubmittedAssignmentPDF = (notSubmittedQuizzesData) => {
  //^ initialize jsPDF
  const doc = new jsPDF();
  let count = 1;

  const quizNameArray = notSubmittedQuizzesData.map((quiz) => {
    return quiz.quiz.title;
  });

  const quizName = quizNameArray[0];

  //^ define the columns we want and their titles
  const tableColumn = [
    "ID",
    "Student Name",
    "Email ID",
    "Due Date",
    "Subject",
    "Classroom",
  ];
  //^ define an empty array of rows
  const tableRows = [];

  //^ for each assignment, pass the necessary data into an array
  notSubmittedQuizzesData.forEach((notSubmittedQuiz) => {
    const dueDateString = notSubmittedQuiz.quiz.end_date;
    const dueDate = new Date(dueDateString);
    const dueDateFormatted = dueDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });

    let quizData = [
      count++,
      `${notSubmittedQuiz.student.student_first_name} ${notSubmittedQuiz.student.student_last_name}`,
      notSubmittedQuiz.student.student_email,
      dueDateFormatted,
      notSubmittedQuiz.quiz.subject.subject_name,
      notSubmittedQuiz.quiz.classroom.classroom_name,
    ];

    //^ push each assignment's info into a row
    tableRows.push(quizData);
  });

  //^ startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  //^ we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  //^ teacher title. and margin-top + margin-left
  doc.text(
    `Total Students which is not attempted the ${quizName} quiz.`,
    14,
    10
  );
  //^ we define the name of our PDF file.
  doc.save(`${quizName}_report_${dateStr}.pdf`);
};

export default generateNotSubmittedAssignmentPDF;
