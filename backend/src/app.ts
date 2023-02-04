import express from "express";
import dotenv from "dotenv";

dotenv.config();

//#TODO: "work on authentications"
//#TODO: "write better login routes"
//#TODO:  "Also write signup routes"

// routes
import signupRoute from "./routes/signUp";
import loginRoute from "./routes/login";

const app = express();
const port = process.env.PORT;

// signup
app.use("/signup", signupRoute);
// login
app.use("/login", loginRoute);

app.listen(port, () => {
  console.log(`[server]: server is listening at http://localhost:${port}/`);
});