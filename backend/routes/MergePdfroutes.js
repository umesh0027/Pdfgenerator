





const express = require('express');
const router = express.Router();
const { mergePDFs } = require('../Controllers/MergePdfControllers');

// Route for merging PDFs
router.post('/merge-pdf', mergePDFs);

module.exports = router;
