import jsPDF from "jspdf";
import "jspdf-autotable";
import formattedDateTime from "../../../../../utils/formatted-date-time";

//^ define a generatePDF function that accepts a student argument
const generateNotSubmittedAssignmentPDF = (submittedQuizzesData) => {
  //^ initialize jsPDF
  const doc = new jsPDF();
  let count = 1;

  const quizNameArray = submittedQuizzesData.map((quiz) => {
    return quiz.quiz.title;
  });

  const quizName = quizNameArray[0];

  //^ define the columns we want and their titles
  const tableColumn = [
    "ID",
    "Student Name",
    "Grade",
    "Student status",
    "Submitted On",
    "Start Time",
    "End Time",
  ];
  //^ define an empty array of rows
  const tableRows = [];

  //^ for each assignment, pass the necessary data into an array
  submittedQuizzesData.forEach((submittedQuiz) => {
    const startDateString = submittedQuiz.start_time;
    const startDate = new Date(startDateString);
    const startTimeString = startDate.toLocaleTimeString("en-US");

    const submittedOnDateString = submittedQuiz.submitted_on;
    const submittedOnDate = new Date(submittedOnDateString);
    const submittedOnFormatted = submittedOnDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });

    const endDateString = submittedQuiz.end_time;
    const endDate = new Date(endDateString);
    const endTimeString = endDate.toLocaleTimeString("en-US");

    let quizData = [
      count++,
      `${submittedQuiz.student.student_first_name} ${submittedQuiz.student.student_last_name}`,
      `${submittedQuiz.obtained_marks ? submittedQuiz.obtained_marks : 0} / ${
        submittedQuiz.quiz.total_marks
      }`,
      submittedQuiz.status,
      submittedOnFormatted,
      startTimeString,
      endTimeString
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
    `Total Students which is attempted the ${quizName} quiz.`,
    14,
    10
  );
  //^ we define the name of our PDF file.
  doc.save(`${quizName}_report_${dateStr}.pdf`);
};

export default generateNotSubmittedAssignmentPDF;
