


const express = require('express');
const router = express.Router();
const generatePDF = require('../Controllers/PdfControllers'); // Replace with the actual controller filename

// Route for generating PDF from JPG images
router.post('/generate-pdf', generatePDF);

module.exports = router;
