const express = require("express");
const router = express.Router();
const {ProgramMaster} = require("../MODELS/programmastermodel")


router.get('/GetAllPrograms', async function (req, res) {
  try {
    const resp = await ProgramMaster.find({});
    res.status(200).json({
      Boolval: true,
      data: resp,
      returnerror: ""
    });
  } catch (err) {
  
    res.status(500).json({
      Boolval: false,
      returnerror: err.message
    });
  }
}
)

module.exports = router;
