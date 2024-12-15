const express = require("express");
// const formidable = require("formidable");
const { compressPdf } = require("../Controllers/CompressPdfControllers");

const router = express.Router();

router.post("/compress", compressPdf);

module.exports = router;
