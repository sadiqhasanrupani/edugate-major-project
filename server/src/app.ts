import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// database
import sequelize from "./utils/database.config";

//* routes
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

//* utils
import invite from "./utils/helper/invite";

// middleware
import { error as ErrorMiddleware } from "./middlewares/error";

const app = express();
const port = process.env.PORT;

// Static Image Middleware
app.use(express.static(path.join(__dirname, "../public")));

// BodyParse
app.use(bodyParser.json());

// Cors Middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "GET,POST,PATCH,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes
app.use("/auth", authRoute);
app.use(roleRoute);
app.use("/teacher", teacherRoute);
app.use("/student", studentRoute);
app.use("/classroom", classroomRoute);
app.use("/subject", subjectRoute);
app.use(joinClassroomRoute);
app.use("/notification", notificationRoute);
app.use("/invite", inviteRoute);
app.use("/assignment", assignmentRoute);

// Error Middleware
app.use(ErrorMiddleware);

sequelize
  .sync()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`[server]: server is listening at http://localhost:${port}/`);
    });

    //* Deleting the invitation records from every 5 minutes
    invite.start(1);
  })
  .catch((err) => console.log(err));
