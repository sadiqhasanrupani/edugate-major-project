const welcomeEmail = (userName: string) => {

  const message = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      <title>Welcome Message</title>
    </head>
    <style>
      * {
        font-family: "Segoe UI", sans-serif;
        color: #2c2e41;
      }
      p {
        line-height: 2px;
      }
    </style>
    <body>
      <h1
        style="
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #2c2e41;
          font-size: 1.1rem;
        "
      >
        Welcome ${userName},
      </h1>
      <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #2C2E41;
        font-size: .8rem;
      ">
        <p>
          We are thrilled to have you as a part of our EDUGATE Service 😊! Our goal
          is to provide you with a seamless and effective solution for managing
          your educational needs.
        </p>
        <p>With our service, you can expect the following benefits:</p>
        <ul>
          <li>Access to the latest educational resources and materials.</li>
          <li>
            Efficient communication and collaboration with teachers, students, and
            administrators.
          </li>
          <li>Easy tracking of student performance and progress.</li>
          <li>
            A centralized platform for managing schedules, assignments, and
            grades.
          </li>
        </ul>
        <p>
          We believe that our service will greatly improve your educational
          experience and help you achieve your goals. To get started, simply log
          in to your account and start exploring all of the features that our
          platform has to offer.
        </p>
        <p>
          If you have any questions or concerns, please don't hesitate to reach
          out to us. Our support team is available 24/7 to assist you.
        </p>
        <p>Best regards, EDUGATE Team.</p>
      </div>
    </body>
  </html>  
  `

  return message;
}

export default welcomeEmail;