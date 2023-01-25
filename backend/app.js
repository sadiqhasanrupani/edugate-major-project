const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  res.send("Hello world");
})

app.listen(9000, () => {
  console.log("this app is running on localhost:9000")
});