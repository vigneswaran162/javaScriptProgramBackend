const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
}));

app.use(bodyParser.json({ limit: "50mb" }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
}));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MongoDB connection string is missing!");
} else {
  mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("DB Error:", err));
}

// Routes
app.get('/', (req, res) => {
    res.send("API Working");
});

const userroutes = require('./ROUTES/programroute');
app.use('/api', userroutes);

// ❌ REMOVE app.listen()

// ✅ EXPORT for Vercel
module.exports = app;