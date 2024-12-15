const { PDFDocument } = require('pdf-lib');
const formidable = require('formidable');
const sharp = require('sharp');
const fs = require('fs');

exports.compressPdf = async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(400).json({ error: "Error parsing form data." });
    }

    const compressionLevel = fields.compressionLevel || "Recommended"; // Default to Recommended
    const fileArray = files.pdf;

    if (!fileArray || fileArray.length === 0) {
      return res.status(400).json({ error: "No PDF file uploaded." });
    }

    const file = Array.isArray(fileArray) ? fileArray[0] : fileArray;
    const filePath = file.filepath;

    try {
      // Load PDF
      const fileBuffer = fs.readFileSync(filePath);
      const pdfDoc = await PDFDocument.load(fileBuffer);
      const pages = pdfDoc.getPages();

      for (const page of pages) {
        const { xObjects } = page.node.Resources || {};

        if (xObjects) {
          for (const key in xObjects) {
            const xObject = xObjects[key];

            if (xObject && xObject.getImage) {
              const image = await xObject.getImage();
              const imageBuffer = image.bytes;

              // Set quality and resize based on compression level
              let quality, resizeWidth;
              if (compressionLevel === "Extreme") {
                quality = 40; // Lowest quality
                resizeWidth = 800; // Reduce resolution
              } else if (compressionLevel === "Recommended") {
                quality = 70; // Balanced quality
                resizeWidth = 1200;
              } else {
                quality = 90; // Highest quality
                resizeWidth = 1600;
              }

              // Compress image using sharp
              const compressedImageBuffer = await sharp(imageBuffer)
                .resize({ width: resizeWidth })
                .jpeg({ quality })
                .toBuffer();

              // Replace image in PDF
              const newImage = await pdfDoc.embedJpg(compressedImageBuffer);
              page.drawImage(newImage, { x: 0, y: 0, width: page.getWidth(), height: page.getHeight() });
            }
          }
        }
      }

      // Remove PDF metadata to further reduce size
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('');
      pdfDoc.setCreator('');

      // Save optimized PDF
      const optimizedPdfBytes = await pdfDoc.save();

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="compressed.pdf"');
      res.status(200).send(Buffer.from(optimizedPdfBytes));
    } catch (error) {
      console.error("Error compressing PDF:", error);
      res.status(500).json({ error: "An error occurred while compressing the PDF." });
    }
  });
};
