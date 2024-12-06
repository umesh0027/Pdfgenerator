



const { PDFDocument } = require('pdf-lib');
const formidable = require('formidable');

exports.mergePDFs = async (req, res) => {
  const form = new formidable.IncomingForm(); // Handles form-data parsing

  try {
    // Parse incoming form data
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(400).json({ error: 'Error parsing the form data.' });
      }

      const pdfFiles = Array.isArray(files.pdfs) ? files.pdfs : [files.pdfs];

      // Validate that at least two PDFs were uploaded
      if (!pdfFiles || pdfFiles.length < 2) {
        return res.status(400).json({ error: 'Please upload at least two PDF files to merge.' });
      }

      // Create a new PDFDocument instance
      const mergedPdf = await PDFDocument.create();

      // Merge the PDFs
      for (const file of pdfFiles) {
        const pdfBuffer = require('fs').readFileSync(file.filepath); // Read the PDF file
        const pdf = await PDFDocument.load(pdfBuffer); // Load the PDF with pdf-lib
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices()); // Copy all pages
        copiedPages.forEach((page) => mergedPdf.addPage(page)); // Add pages to the merged PDF
      }

      // Save the merged PDF in memory
      const mergedPdfBytes = await mergedPdf.save();

      // Send the merged PDF as a downloadable file to the client
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=merged.pdf',
        'Content-Length': mergedPdfBytes.length,
      });

      res.end(mergedPdfBytes); // Send the merged PDF bytes to the client
    });
  } catch (error) {
    console.error('Error merging PDFs:', error);
    res.status(500).json({ error: 'An error occurred while merging PDFs.' });
  }
};
