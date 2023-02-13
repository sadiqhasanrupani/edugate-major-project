import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// database
import sequelize from "./utils/database.config";

dotenv.config();

//#TODO: "work on authentications"
//#TODO: "write better login routes"
//#TODO:  "Also write signup routes"

// routes
import signupRoute from "./routes/signUp";
import loginRoute from "./routes/login";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "GET,POST,PATCH,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authentication");
  next();
});

// signup
app.use("/signup", signupRoute);
// login
app.use("/login", loginRoute);

sequelize
  .sync()
  .then((result) =>
    app.listen(port, () => {
      console.log(`[server]: server is listening at http://localhost:${port}/`);
    })
  )
  .catch((err) => console.log(err));
