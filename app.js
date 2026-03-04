const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


app.get("/", async (req, res) => {
  res.send("API RUNING...");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});