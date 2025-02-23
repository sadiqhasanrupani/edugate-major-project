//^ dependencies
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
dotenv.config();

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
import deleteInvite from "./utils/helper/invite";

//^ middleware
import { error as ErrorMiddleware } from "./middlewares/error";

const app = express();
const port = process.env.PORT;

//^ BodyParse
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://edugate.sadiqr.in",
  }),
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms"),
);

//^ Static Image Middleware
app.use(express.static(path.join(__dirname, "../public")));

//^ Routes
// app.use("/", (_req, res) => {
//   res.send("Hello world");
// });

app.set("trust proxy", true); // Allow Nginx to handle proxy headers

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
    app.listen(port || 8082, () => {
      console.log(`[server]: Server is running on http://127.0.0.1:${port}`);
    });
    //^ Deleting the invitation records from every 5 minutes
    deleteInvite.start(1);
  })
  .catch((err) => console.log(err));
