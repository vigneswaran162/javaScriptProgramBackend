const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const filePath = './db.json';

// 🔹 Read data
function readData() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

// 🔹 Write data
function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ✅ GET ALL
app.get('/GetAllPrograms', (req, res) => {
  const data = readData();
  res.json(data.programs);
});

// ✅ INSERT
app.post('/ProgramsCreate', (req, res) => {
  const data = readData();
  
  console.log(req.body)

  const newItem = {
    id: Date.now(),
    ...req.body
  };

  data.programs.push(newItem);
  writeData(data);

  res.json(newItem);
});

// ✅ UPDATE
app.put('/programs/:id', (req, res) => {
  const data = readData();

  const id = parseInt(req.params.id);

  const index = data.programs.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).send('Not found');
  }

  data.programs[index] = {
    id,
    ...req.body
  };

  writeData(data);

  res.json(data.programs[index]);
});

// ✅ DELETE
app.delete('/programs/:id', (req, res) => {
  const data = readData();

  const id = parseInt(req.params.id);

  data.programs = data.programs.filter(p => p.id !== id);

  writeData(data);

  res.json({ message: 'Deleted' });
});

// 🚀 START SERVER
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
