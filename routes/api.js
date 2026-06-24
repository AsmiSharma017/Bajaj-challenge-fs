const express = require("express");
const processData = require("../services/hs");

const router = express.Router();

router.post("/", (req, res) => {
  res.json(processData(req.body.data || []));
});

module.exports = router;