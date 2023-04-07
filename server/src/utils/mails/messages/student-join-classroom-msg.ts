interface MessageData {
  student_name?: string;
  classroom_name?: string;
  admin_teacher_name?: string;
  admin_teacher_email?: string;
}

const studentJoinClassroomMsg = (message: MessageData) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to our classroom!</title>
  </head>
  <style>
    * {
      font-family: "Segoe UI", sans-serif;
      color: #2c2e41;
    }
  
    p {
      line-height: 2;
    }
  </style>
  
  <body>
    <div>
      <h1>
        Dear ${message.student_name},
      </h1>
  
      <p>
        I am thrilled to welcome you to our ${message.classroom_name} classroom community! We are delighted that you have decided
        to join our class
        through the Edugate, the e-learning platform.
  
      </p>
  
      <p>
        As you may know, we are a vibrant and enthusiastic group of learners who value active participation, open-mindedness, and collaborative learning. Our classroom culture is built on mutual respect, empathy, and a passion for learning. We believe that every student has unique strengths and talents that can be nurtured through supportive and engaging learning experiences.
      </p>
  
      <p>
        I am excited to share with you our classroom syllabus, assignments, and learning objectives for this semester. You
        will find all the necessary resources, links, and materials on the webapp, which will help you to stay organized
        and
        informed throughout the course.
  
      </p>
  
      <p>
        Please feel free to reach out to me if you have any questions, concerns, or feedback. I am always here to help you
        and support your learning journey. You can contact me through the webapp or via email at ${message.admin_teacher_email}.
  
      </p>
  
      <p>
        Once again, welcome to our ${message.classroom_name} classroom! I look forward to getting to know you and learning
        together this semester.
      </p>
  
      <p>
        Sincerely,
  
        ${message.admin_teacher_name}
      </p>
  </body>
  
  </html>
  `;
};

export default studentJoinClassroomMsg;
