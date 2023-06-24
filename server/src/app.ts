//^ dependencies
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

//^ database configuration
import sequelize from "./utils/database.config";

//^ routes
import authRoute from "./routes/auth";
import roleRoute from "./routes/role";
import teacherRoute from "./routes/teacher";
import studentRoute from "./routes/student";
import classroomRoute from "./routes/classroom";
import subjectRoute from "./routes/subject";
import joinClassroomRoute from "./routes/joinClassroom";
import notificationRoute from "./routes/notification";
import inviteRoute from "./routes/invite";
import assignmentRoute from "./routes/assignment";
import joinSubjectRoute from "./routes/join-subject";
import optionalSubjectRoute from "./routes/optional-subject";
import joinOptionalSubjectRoute from "./routes/join-optional-subject";
import quizRoute from "./routes/quiz";
import joinAssignmentRoute from "./routes/join-assignment";
import submittedAssignmentRoute from "./routes/submitted-assignment";
import submitQuizRoute from "./routes/submit-quiz";
import searchRoute from "./routes/search";

//^ utils
import invite from "./utils/helper/invite";

//^ middleware
import { error as ErrorMiddleware } from "./middlewares/error";

const app = express();
const port = process.env.PORT;

//^ BodyParse
app.use(bodyParser.json());
app.use(cors());

app.use(
  cors({
    origin: "*",
  })
);

//^ Static Image Middleware
app.use(express.static(path.join(__dirname, "../public")));

//^ Routes
app.use("/auth", authRoute);
app.use(roleRoute);
app.use("/teacher", teacherRoute);
app.use("/student", studentRoute);
app.use("/classroom", classroomRoute);
app.use("/subject", subjectRoute);
app.use("/join-subject", joinSubjectRoute);
app.use(joinClassroomRoute);
app.use("/notification", notificationRoute);
app.use("/invite", inviteRoute);
app.use("/assignment", assignmentRoute);
app.use("/join-assignment", joinAssignmentRoute);
app.use("/submitted-assignment", submittedAssignmentRoute);
app.use("/optional-subject", optionalSubjectRoute);
app.use("/join-optional-subject", joinOptionalSubjectRoute);
app.use("/quiz", quizRoute);
app.use("/submit-quiz", submitQuizRoute);
app.use("/search", searchRoute);

//^ Error Middleware
app.use(ErrorMiddleware);

sequelize
  .sync()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`[server]: server is listening at http://localhost:${port}/`);
    });

    //^ Deleting the invitation records from every 5 minutes
    invite.start(1);
  })
  .catch((err) => console.log(err));
