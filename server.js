const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');

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

// ✅ DB first
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send("API Working");
});

const userroutes = require('./ROUTES/programroute');
app.use('/api', userroutes);

// Export for Vercel
module.exports = app;