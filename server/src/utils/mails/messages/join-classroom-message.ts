const JoinClassroomMsg = (
  adminName: string,
  teacherName: string,
  classroomName: string
) => {
  return `
      <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${teacherName} Successfully Joined the Classroom</title>
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
        <h1>Dear ${adminName},</h1>

        <p>
          I hope this email finds you well. I am writing to inform you that ${teacherName} has successfully joined
          ${classroomName} as a new teacher.

        </p>

        <p>
          ${teacherName} brings with them a wealth of experiences, and I am confident that they
          will make a valuable contribution to the classroom. They are excited to get started and work with the students.

        </p>

        <p>
          I wanted to notify you of this update, as I understand that you are responsible for managing the classroom and its
          members. Please let me know if there is anything that needs to be done to ensure a smooth transition for ${teacherName}, such as providing access to relevant materials or setting up a meeting to introduce them to the other
          teachers and staff members.

        </p>

        <p>
          Thank you for your attention to this matter, and please let me know if you have any questions or concerns.

        </p>

        <p>
          Best regards,

          Edugate Team
        </p>
    </body>

    </html>
  `;
};

export default JoinClassroomMsg;
