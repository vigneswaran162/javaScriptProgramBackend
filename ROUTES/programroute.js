const express = require("express");
const router = express.Router();
const {ProgramMaster} = require("../MODELS/programmastermodel")




router.get('/GetAllPrograms', async (req, res) => {
  try {
    const data = await ProgramMaster.find();
    res.json(data);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({
      Boolval: false,
      returnerror: err.message
    });
  }
});



module.exports = router;
