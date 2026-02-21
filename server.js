const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// ✅ CONNECT DB FIRST
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});

const userroutes = require("./ROUTES/programroute");
app.use("/api", userroutes);

module.exports = app;