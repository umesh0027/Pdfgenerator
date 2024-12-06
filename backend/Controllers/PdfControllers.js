




const formidable = require('formidable'); // Handles form-data parsing
const PDFDocument = require('pdfkit');

// Generate a PDF directly from images and send it as a response
const generatePDF = async (req, res) => {
  const form = new formidable.IncomingForm(); // Create a new form instance

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing the form:', err);
        return res.status(400).json({ error: 'Error parsing the form data.' });
      }

      if (!files.images || files.images.length === 0) {
        return res.status(400).json({ error: 'No images uploaded.' });
      }

      // Create a new PDF document
      const doc = new PDFDocument();
      const chunks = [];

      // Collect PDF data chunks
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => {
        // Convert the PDF into a buffer
        const pdfBuffer = Buffer.concat(chunks);

        // Set response headers for downloading the file
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

        // Send the PDF buffer as a response
        res.status(200).send(pdfBuffer);
      });

      // Add images to the PDF
      const imageFiles = Array.isArray(files.images) ? files.images : [files.images];

      imageFiles.forEach((file, index) => {
        doc.image(file.filepath, { fit: [500, 700], align: 'center', valign: 'center' });
        if (index < imageFiles.length - 1) {
          doc.addPage(); // Only add a new page if it's not the last image
        }
      });

      doc.end(); // Finalize the PDF
    });
  } catch (error) {
    console.error('Error generating the PDF:', error);
    res.status(500).json({ error: 'An error occurred while generating the PDF.' });
  }
};

module.exports = generatePDF;
