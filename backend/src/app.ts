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

// middleware
import { error as ErrorMiddleware } from "./middlewares/error";

const app = express();
const port = process.env.PORT;

// Static Image Middleware
app.use(express.static(path.join(__dirname, "..")));

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

// Error Middleware
app.use(ErrorMiddleware);

sequelize
  .sync()
  .then(() =>
    app.listen(port, () => {
      console.log(`[server]: server is listening at http://localhost:${port}/`);
    })
  )
  .catch((err) => console.log(err));
