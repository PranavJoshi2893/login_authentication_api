const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(
  cors({
    origin: "http://localhost",
    allowedHeaders: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

const userRoute = require("./route/user.route");
app.use("/api/v1/user", userRoute);

module.exports = app;
