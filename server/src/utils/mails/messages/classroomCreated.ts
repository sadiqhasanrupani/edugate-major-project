const InstiuteCreationMsg = (instituteName: string, instituteAdmin: string) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Institute Created Successfully</title>
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
        <h1>Your ${instituteName} is created successfully</h1>
        <h4> <p>Dear ${instituteAdmin},</p></h4>
        <p>
          I am writing to inform you that your institute has been successfully
          created. Congratulations on taking this important step towards sharing
          your knowledge and expertise with others!
        </p>
  
        <p>
          With your newly created institute, you can now share your courses,
          tutorials, and expertise with your students on our
          platform. We believe that your institute will be a great addition to our
          community and will help our users to learn and grow in their personal
          and professional lives.
        </p>
  
        <p>As a reminder, here are some of the key features of your institute:</p>
  
        <p>
          You can create courses and tutorials on any subject that you are
          knowledgeable about. You can set your own pricing and course
          structure to best suit your needs. You will have access to all the tools
          you need to manage your students and courses, including analytics,
          messaging and notifications. We are excited to see what you will create
          on our platform and we look forward to supporting you in any way we can.
          If you have any questions or concerns, please do not hesitate to contact
          us at <a href="mailto:edugate110@gmail.com">edugate110@gmail.com</a>.
        </p>
  
        <p>
          Thank you for choosing our platform and for being a part of our
          community.
        </p>
  
        <p>Best regards, Edugate Team</p>
      </div>
    </body>
  </html>
  `;
};

export default InstiuteCreationMsg;