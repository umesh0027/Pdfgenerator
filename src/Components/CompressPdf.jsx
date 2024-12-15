import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import Navbar from './Navbar';

const PdfUploader = () => {
  const [file, setFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState("Recommended");
  const [originalFileSize, setOriginalFileSize] = useState(0);
  const [compressedFileSize, setCompressedFileSize] = useState(0);
  const [reductionPercentage, setReductionPercentage] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null); // PDF URL to trigger download
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState('');

  // Handle file drop
  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0]; // We only accept one file
    if (uploadedFile) {
      setFile(uploadedFile);
      setOriginalFileSize(uploadedFile.size); // Store original file size
      setError(''); // Clear error if file is selected
    }
  };

  const handleCompress = async () => {
    if (!file) {
      setError('Please upload a PDF file.');
      toast.error('Please upload a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('compressionLevel', compressionLevel);

    setIsLoading(true); // Set loading to true when processing starts
    const loadingToast = toast.loading("Compressing PDF... Please wait...", { id: "loading" });

    try {
      const response = await axios.post('https://pdfgenerator-6vps.onrender.com/api/pdf/compress', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob', // Expect the response as a file (PDF)
      });

      // Calculate compressed file size
      const compressedBlob = new Blob([response.data]);
      const compressedSize = compressedBlob.size;

      // Calculate percentage reduction
      const reduction = ((originalFileSize - compressedSize) / originalFileSize) * 100;

      setCompressedFileSize(compressedSize);
      setReductionPercentage(reduction.toFixed(2)); // Keep two decimal places

      // Create a URL for the compressed PDF and set it in the state
      const url = window.URL.createObjectURL(compressedBlob);
      setPdfUrl(url); // Set the PDF URL

      toast.success("PDF compressed successfully!");
    } catch (err) {
      console.error("Error compressing PDF:", err);
      setError("An error occurred while compressing the PDF.");
      toast.error('Failed to compress PDF. Please try again.');
    } finally {
      setIsLoading(false); // Set loading to false when done
      toast.dismiss(loadingToast);
    }
  };

  // Use dropzone to handle file drag-and-drop
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf', // Only accept PDF files
    multiple: false, // Only allow one file
  });

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="min-h-screen flex items-center bg-blue-250 p-4 flex-col">
        {/* Background Heading */}
        <h1 className="text-3xl lg:text-5xl font-extrabold text-richblack-600 font-extrabold text-center px-4 lg:my-8 mt-6">
          PDF Compressor
        </h1>
        <h2 className="text-xl lg:text-2xl font-extrabold text-pure-greys-400 text-center px-4 py-10">
          "Reduce the Size of Your PDF Files"
        </h2>

        {/* Form Container */}
        <div className="relative w-full max-w-lg p-6 bg-white shadow-lg rounded-lg z-10">
          <h3 className="text-2xl font-semibold text-center text-pure-greys-700 mb-6">PDF Compression</h3>

          {/* Drag-and-drop file upload */}
          <div
            {...getRootProps()}
            className="w-3/4 h-20 flex justify-center items-center bg-pink-150 hover:bg-pink-200 border-gray-300 rounded-xl cursor-pointer mb-6 mx-auto"
          >
            <input {...getInputProps()} />
            <p className="text-center text-white font-bold mx-2">
              Drag & Drop PDF Here or Click to Select
            </p>
          </div>

          {/* Error Message */}
          {error && <p className="text-pink-300 text-center mb-4">{error}</p>}

          {/* Compression Level Dropdown */}
          <div className="mb-6">
            <select
              value={compressionLevel}
              onChange={(e) => setCompressionLevel(e.target.value)}
              className="w-full py-3 px-4 bg-pure-greys-100 border border-pure-greys-300 rounded-lg focus:outline-none font-semibold"
            >
              <option value="Extreme">Extreme Compression</option>
              <option value="Recommended">Recommended Compression</option>
              <option value="Less">Less Compression</option>
            </select>
          </div>

          {/* Compress Button */}
          <div className="mb-6">
            <button
              onClick={handleCompress}
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Compressing PDF...' : 'Compress PDF'}
            </button>
          </div>

          {isLoading && (
            <div className="mt-4 text-center">
              <p className="text-blue-600">Processing...</p>
            </div>
          )}

          {/* Download Link */}
          {pdfUrl && (
            <div className="mt-6 text-center">
              <a
                href={pdfUrl}
                download="compressed.pdf"
                className="text-blue-600 hover:underline"
              >
                Click here to download your compressed PDF
              </a>
            </div>
          )}

          {/* File Size and Reduction Percentage */}
          {originalFileSize > 0 && (
            <div className="mt-6 text-center text-yellow-500">
              <p className='font-semibold'>Original File Size: <strong>{(originalFileSize / 1024).toFixed(2)} KB</strong></p>
              {compressedFileSize > 0 && (
                <>
                  <p className='font-semibold'>Compressed File Size: <strong>{(compressedFileSize / 1024).toFixed(2)} KB</strong></p>
                  <p className='font-semibold'>
                    File Size Reduction:{" "}
                    <strong className="text-green-500">{reductionPercentage}%</strong>
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PdfUploader;
