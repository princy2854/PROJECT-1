const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const homerouter = require("./router/homerouter");
const port = process.env.port || 8080;
const app = express();
// db connection
mongoose.connect
  ("mongodb://localhost:27017/studentsdata");

const db = mongoose.connection;
db.on("error",console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected");
});
app.set("view engine", "ejs");
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/", homerouter);

app.listen(port);
