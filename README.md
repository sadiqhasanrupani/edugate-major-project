<div align="left"><img src="./client/assets/logo/edugate-logo-white-theme.svg" /></div>
<br />

# Edugate (Education Management System)

- This Web app is based on the EMS _(Education Management System)_.

- This Web app will include the following features:

  1. Graphical Analysis with Tabular Report for Teachers.
  2. Graphical Analysis Report for Students.
  3. Assignments.
  4. Quizzes.

- You can find a Screen Capture Video Link below:
      
    [EDUGATE Screen Capture Video](https://drive.google.com/file/d/1l1UMtv_usytN66y3KyDb587uexLvt4cV/view)

- To access our websites, please take the following steps:

  1. Make a copy of this repository:

      ```php
        git clone https://github.com/sadiqhasanrupani/edugate-major-project.git
      ```

  2. Before proceeding, you need to have nodejs installed on your PC; if not, download it from this [link](https://nodejs.org/en/):

      ```powershell
        cd edugate-major-project
      ```

  3. Install the dependencies in both the client and server folders at the same time using this command:

      ```powershell
        cd client; npm install; cd ..; cd server; npm run build
      ```

  4. Now create a database called "edugate_db" in MySQL. If you don't have MySQL on your device then download it from [here](https://dev.mysql.com/downloads/windows/installer/8.0.html).

      - If you know how to create a database then go to step.
      - First, open the MySQL workbench or mysql console, I will open the MySQL workbench.

          <img src="assets/mysql%20process/mysql%20workbench%20search.png" />
      - Second, open a local MySQL,

          <img src="assets/mysql%20process/open%20local%20instance.png">
      - Third, Copy and paste this command to create an "edugate_db" Database.

          ```sql
            CREATE DATABASE IF NOT EXISTS edugate_db;
          ```

          <img src="assets/mysql%20process/database%20code.png">

  5. Now set up the `.env` file in both the client and server folder respectively.  
      
      - In the client create a file called as `.env` and write the following code inside that file,
        ```ini
          REACT_APP_HOSTED_URL= http://localhost:8080

          # Or you can declare your own backend server 
          # choice is yours.
        ```

      - Simultaneously, create a file `.env` inside the server directory and then copy and paste this code inside that file,
      
        ```ini
        PORT = 8080
        
        # Create a dummy email id for sending mails in the web application
        EMAIL = xyz@gmail.com
        PASS = ********

        SERVICE = gmail

        # LocalHost Database
        SQL_DATABASE = edugate_db 
        SQL_HOST = host address # 127.0.0.1 or localhost
        SQL_USER = user_name # root
        SQL_PASSWORD = ***********
        SQL_PORT = 3306  # sql port is by default is "3306" or you change it, then write here.

        # Secret Token
        SECRET_TOKEN = any_secret_token_you_want

        # Backend Site Address
        HOST_SITE = "http://localhost:8080"
        ```

  6. Run this command in two terminals to start both the front end and the back end.

      - In the first terminal copy and paste this code
        ```powershell
          cd client; npm start;
        ```
      - In the second terminal, copy and paste this code
        ```powershell
          cd server; npm start;
        ```

You are now ready to go!