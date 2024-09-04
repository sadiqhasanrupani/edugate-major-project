interface MessageData {
  admin_name?: string;
  student_name?: string;
  classroom_name?: string;
}

const adminStudentJoinedClassroom = (message: MessageData) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>[Student Name] joined our Classroom</title>
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
        Dear ${message.admin_name},
      </h1>
  
      <p>
        I am writing to inform you that ${message.student_name} has joined our classroom through the Edugate, the e-learning
        webapp. He/She has shown great enthusiasm and eagerness to learn, and I believe he/she will be a valuable addition
        to our class community.
      </p>
  
      <p>
        As [he/she] has just joined our class, I wanted to ensure that you are aware of this and have added [him/her] to
        our student roster. [He/She] has already received the classroom syllabus and other necessary resources through the
        webapp, and [he/she] is eager to get started with the assignments and activities.
      </p>
  
      <p>
        Please let me know if you need any additional information or have any questions regarding ${message.student_name}'s
        enrollment in our class.
      </p>
  
      <p>
        Thank you for your support and assistance in maintaining a smooth learning experience for all students.
      </p>
  
      <p>
        Once again, welcome to our ${message.student_name} classroom! I look forward to getting to know you and learning
        together this semester.
      </p>
  
      <p>
        Best regards,
  
        Edugate Team
      </p>
  </body>
  
  </html>
  `
}

export default adminStudentJoinedClassroom;