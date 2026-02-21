const express = require("express");
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
}))

app.use(bodyParser.json({ limit: "50mb" })); 


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  }));


  

const PORT = process.env.PORT || 4000
const mongoURI = process.env.MONGO_URI;


if (!mongoURI) {
  console.error("MongoDB connection string is missing!");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Error:", err);
    process.exit(1);
  }
};

connectDB();

app.get('/', (req, res) => {
    res.send("API Working");
});


const userroutes = require('./ROUTES/programroute')
app.use('/api', userroutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });