//TODO: "work on authentications"

import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

// database
import sequelize from "./utils/database.config";

// routes
import authRoute from "./routes/auth";

// middleware
// import { error } from "./middlewares/error";

const app = express();
const port = process.env.PORT;

// app.use("/views", express.static(path.join(__dirname, "views")));

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "GET,POST,PATCH,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoute);

// app.use(error);

sequelize
  .sync()
  .then(() =>
    app.listen(port, () => {
      console.log(`[server]: server is listening at http://localhost:${port}/`);
    })
  )
  .catch((err) => console.log(err));
