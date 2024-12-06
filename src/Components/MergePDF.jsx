




// import React, { useState } from 'react';
// import axios from 'axios';

// const MergePDF = () => {
//   const [selectedFiles, setSelectedFiles] = useState(null);
//   const [mergedPDFUrl, setMergedPDFUrl] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Handle file input change
//   const handleFileChange = (event) => {
//     setSelectedFiles(event.target.files); // Store the selected files
//     setMergedPDFUrl(null); // Clear any previously generated PDF URL
//     setError(null);
//   };

//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!selectedFiles || selectedFiles.length < 2) {
//       setError('Please select at least two PDF files.');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const formData = new FormData();
//     Array.from(selectedFiles).forEach((file) => formData.append('pdfs', file));

//     try {
//       const response = await axios.post('http://localhost:5000/api/merge-pdf', formData, {
//         responseType: 'blob', // Get the response as a binary blob
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       // Create a downloadable link for the merged PDF
//       const mergedPDF = window.URL.createObjectURL(new Blob([response.data]));
//       setMergedPDFUrl(mergedPDF);
//     } catch (error) {
//       console.error('Error merging PDFs:', error);
//       setError('An error occurred while merging the PDFs.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>Merge PDFs</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="pdfFiles">Select PDFs (at least 2):</label>
//           <input
//             type="file"
//             id="pdfFiles"
//             name="pdfFiles"
//             accept="application/pdf"
//             multiple
//             onChange={handleFileChange}
//           />
//         </div>

//         <button type="submit" disabled={loading} style={{ marginTop: '10px' }}>
//           {loading ? 'Merging...' : 'Merge PDFs'}
//         </button>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {mergedPDFUrl && (
//         <div style={{ marginTop: '20px' }}>
//           <h4>Merged PDF:</h4>
//           <a href={mergedPDFUrl} download="merged.pdf">
//             Download Merged PDF
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MergePDF;



import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import Navbar from './Navbar';

const MergePDF = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [mergedPDFUrl, setMergedPDFUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState('');

  // Handle file selection via drag-and-drop or file input
  const onDrop = (acceptedFiles) => {
    setSelectedFiles(acceptedFiles);
    setMergedPDFUrl(null); // Clear any previously generated PDF URL
    setError('');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf', // Accept only PDF files
    multiple: true, // Allow multiple files
  });

  // Handle form submission (merging PDFs)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFiles || selectedFiles.length < 2) {
      setError('Please select at least two PDF files.');
      return;
    }

    setIsLoading(true);
    setError('');

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => formData.append('pdfs', file));

    const loadingToast = toast.loading("Merging PDFs... Please wait...", { id: "loading" });

    try {
      const response = await axios.post('https://pdfgenerator-6vps.onrender.com/api/merge-pdf', formData, {
        responseType: 'blob', // Expecting a binary blob (PDF file)
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Create a downloadable link for the merged PDF
      const mergedPDF = window.URL.createObjectURL(new Blob([response.data]));
      setMergedPDFUrl(mergedPDF);
      toast.success("PDF merged successfully!");
    } catch (err) {
      console.error('Error merging PDFs:', err);
      setError('An error occurred while merging the PDFs.');
      toast.error('Failed to merge PDFs. Please try again.');
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="min-h-screen flex items-center bg-blue-250 p-4 flex-col">
        {/* Heading */}
        <h1 className="text-3xl lg:text-5xl font-extrabold text-richblack-600 text-center px-4 lg:my-8 mt-6">
          Merge PDF Files
        </h1>
        <h2 className="text-xl lg:text-2xl font-extrabold text-pure-greys-400 text-center px-4 py-10">
          "Easily Combine Multiple PDFs into One"
        </h2>

        {/* Form Container */}
        <div className="relative w-full max-w-lg p-6 bg-white shadow-lg rounded-lg z-10">
          <h3 className="text-2xl font-semibold text-center text-pure-greys-700 mb-6">Merge Your PDFs</h3>

          {/* Drag-and-drop or File Input */}
          <div
            {...getRootProps()}
            className="w-3/4 h-20 flex justify-center items-center bg-pink-150 border-gray-300 rounded-xl cursor-pointer mb-6 mx-auto"
          >
            <input {...getInputProps()} />
            <p className="text-center text-white font-bold mx-2">
              Drag & Drop PDFs Here or Click to Select
            </p>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Merging PDFs...' : 'Merge PDFs'}
          </button>

          {isLoading && (
            <div className="mt-4 text-center">
              <p className="text-blue-600">Processing...</p>
            </div>
          )}
        </div>

        {/* Display merged PDF download link */}
        {mergedPDFUrl && (
          <div className="mt-6 text-center">
            <a
              href={mergedPDFUrl}
              download="merged.pdf"
              className="text-blue-600 hover:underline"
            >
              Download Merged PDF
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default MergePDF;
