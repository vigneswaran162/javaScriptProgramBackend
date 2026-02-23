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

// ✅ Connect DB once
let isConnected = false;

async function ensureDBConnection() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

app.use(async (req, res, next) => {
  try {
    await ensureDBConnection();
    next();
  } catch (err) {
    console.error("DB Connection Error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});

const userroutes = require("./ROUTES/programroute");
app.use("/api", userroutes);

module.exports = app;