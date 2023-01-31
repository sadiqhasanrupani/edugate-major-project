// Library Imports
import express from "express";
import bodyParser from "body-parser";
import dotEnv from "dotenv";
dotEnv.config();

// routes
import loginRoute from "./routes/login";

const app = express();
const port: Number = Number(process.env.PORT);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/login", loginRoute);

app.listen(port);
