require("dotenv").load(); //loading .env variables

const express = require("express");
const http = require("http");
const fetch = require("node-fetch");
const logger = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
let oneYear = 1 * 365 * 24 * 60 * 60 * 1000;

//app.use(compression());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./src/views"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use('/', express.static(__dirname + '/build/', { maxAge: oneYear }));

// Require our routes into the application.
require("./src/server/routes")(app);


app.get("/", (req, res) => {
    

});

module.exports = app;
