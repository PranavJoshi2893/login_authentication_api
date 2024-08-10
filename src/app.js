const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoute = require("./route/user.route");
app.use("/api/v1/user", userRoute);

module.exports = app;
