var path = require("path");
var express = require("express");
var app = express();

var studentRouter = require("./api/students");
var headRouter = require("./api/heads");
var markRouter = require("./api/marks"); 
var totalRouter = require("./api/total");
var gradeRouter = require("./api/grades");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/students", studentRouter);
app.use("/api/heads", headRouter);
app.use("/api/marks", markRouter);
app.use("/api/total", totalRouter);
app.use("/api/grades", gradeRouter);

const port = process.env.PORT || 4561;
app.listen(port, () => {
    console.log(`Node is running at : http://localhost:${port}/`);
});

module.exports = app;
