




// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageUpload = () => {
//   const [files, setFiles] = useState(null);
//   const [error, setError] = useState('');

//   const handleFileChange = (e) => {
//     setFiles(e.target.files);
//   };

//   const handleGeneratePdf = async () => {
//     if (!files || files.length === 0) {
//       setError('Please select at least one JPG file.');
//       return;
//     }

//     const formData = new FormData();
//     Array.from(files).forEach((file) => formData.append('images', file));

//     try {
//       const response = await axios.post('http://localhost:5000/api/generate-pdf', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         responseType: 'blob', // Expect the response as a file
//       });

//       // Create a download link for the PDF
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'generated.pdf');
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error('Error generating PDF:', err);
//       setError('Failed to generate PDF. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>JPG to PDF Converter</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <input type="file" multiple accept="image/jpg" onChange={handleFileChange} />
//       <button onClick={handleGeneratePdf}>Generate PDF</button>
//     </div>
//   );
// };

// export default ImageUpload;



// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';
// import { toast, Toaster } from 'react-hot-toast';
// import Navbar from './Navbar';

// const ImageUpload = () => {
//   const [files, setFiles] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState(null); // PDF URL to trigger download
//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   const onDrop = (acceptedFiles) => {
//     setFiles(acceptedFiles);
//   };

//   const handleGeneratePdf = async () => {
//     if (!files || files.length === 0) {
//       toast.error('Please select at least one JPG file.');
//       return;
//     }

//     const formData = new FormData();
//     files.forEach((file) => formData.append('images', file));

//     setIsLoading(true); // Set loading to true when processing starts
//     const loadingToast = toast.loading("Generating PDF... Please wait...", { id: "loading" });

//     try {
//       const response = await axios.post('https://pdfgenerator-6vps.onrender.com/api/generate-pdf', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         responseType: 'blob', // Expect the response as a file (PDF)
//       });

//       // Create a URL for the generated PDF and set it in the state
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       setPdfUrl(url); // Set the PDF URL

//       toast.success("PDF generated successfully!");
//     } catch (err) {
//       console.error('Error generating PDF:', err);
//       toast.error('Failed to generate PDF. Please try again.');
//     } finally {
//       setIsLoading(false); // Set loading to false when done
//       toast.dismiss(loadingToast);
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: 'image/jpg', // Accept only JPG images
//     multiple: true, // Allow multiple files
//   });

//   return (
//     <>
//       <Navbar />
//       <Toaster />
//       <div className="min-h-screen flex items-center bg-blue-250 p-4 flex-col">
//         {/* Background Heading */}
//         <h1 className="text-3xl lg:text-5xl font-extrabold text-richblack-600 font-extrabold text-center px-4 lg:my-8 mt-6">
//           JPG to PDF 
//         </h1>
//         <h2 className="text-xl lg:text-2xl font-extrabold text-pure-greys-400 text-center px-4 py-10">
//           "Easily Convert Multiple Images into a Single PDF"
//         </h2>

//         {/* Form Container */}
//         <div className="relative w-full max-w-lg p-6 bg-white shadow-lg rounded-lg z-10">
//           <h3 className="text-2xl font-semibold text-center text-pure-greys-700 mb-6">Image to PDF Converter</h3>

//           {/* Drag-and-drop file upload */}
//           <div
//             {...getRootProps()}
//             className="w-3/4 h-20 flex justify-center items-center bg-pink-150 border-gray-300 rounded-xl cursor-pointer mb-6 mx-auto"
//           >
//             <input {...getInputProps()} />
//             <p className="text-center text-white font-bold mx-2">
//               Drag & Drop Images Here or Click to Select
//             </p>
//           </div>

//           {/* Error Message */}
//           {!files && <p className="text-pink-300 text-center mb-4">Please select at least one image.</p>}

//           {/* Submit Button */}
//           <button
//             onClick={handleGeneratePdf}
//             className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Generating PDF...' : 'Generate PDF'}
//           </button>

//           {isLoading && (
//             <div className="mt-4 text-center">
//               <p className="text-blue-600">Processing...</p>
//             </div>
//           )}

//           {/* Download Link */}
//           {pdfUrl && (
//             <div className="mt-6 text-center">
//               <a
//                 href={pdfUrl}
//                 download="generated.pdf"
//                 className="text-blue-600 hover:underline"
//               >
//                 Click here to download your PDF
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ImageUpload;





import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import Navbar from './Navbar';

const ImageUpload = () => {
  const [files, setFiles] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null); // PDF URL to trigger download
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [fileCount, setFileCount] = useState(0); // Track number of files selected

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    setFileCount(acceptedFiles.length); // Update file count when files are selected
  };

  const handleGeneratePdf = async () => {
    if (!files || files.length === 0) {
      toast.error('Please select at least one JPG file.');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));

    setIsLoading(true); // Set loading to true when processing starts
    const loadingToast = toast.loading("Generating PDF... Please wait...", { id: "loading" });

    try {
      const response = await axios.post('https://pdfgenerator-6vps.onrender.com/api/generate-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob', // Expect the response as a file (PDF)
      });

      // Create a URL for the generated PDF and set it in the state
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setPdfUrl(url); // Set the PDF URL

      toast.success("PDF generated successfully!");
    } catch (err) {
      console.error('Error generating PDF:', err);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsLoading(false); // Set loading to false when done
      toast.dismiss(loadingToast);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpg', // Accept only JPG images
    multiple: true, // Allow multiple files
  });

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="min-h-screen flex items-center bg-blue-250 p-4 flex-col">
        {/* Background Heading */}
        <h1 className="text-3xl lg:text-5xl font-extrabold text-richblack-600 font-extrabold text-center px-4 lg:my-8 mt-6">
          JPG to PDF 
        </h1>
        <h2 className="text-xl lg:text-2xl font-extrabold text-pure-greys-400 text-center px-4 py-10">
          "Easily Convert Multiple Images into a Single PDF"
        </h2>

        {/* Form Container */}
        <div className="relative w-full max-w-lg p-6 bg-white shadow-lg rounded-lg z-10">
          <h3 className="text-2xl font-semibold text-center text-pure-greys-700 mb-6">Image to PDF Converter</h3>

          {/* Drag-and-drop file upload */}
          <div
            {...getRootProps()}
            className="w-3/4 h-20 flex justify-center items-center bg-pink-150 border-gray-300 rounded-xl cursor-pointer mb-6 mx-auto"
          >
            <input {...getInputProps()} />
            <p className="text-center text-white font-bold mx-2">
              Drag & Drop Images Here or Click to Select
            </p>
          </div>

          {/* Display selected files */}
          {fileCount > 0 && (
            <p className="text-center text-caribbeangreen-600 mb-4">
              {fileCount} {fileCount === 1 ? 'image is' : 'images are'} selected.
            </p>
          )}

          {/* Error Message */}
          {!files && <p className="text-pink-300 text-center mb-4">Please select at least one image.</p>}

          {/* Submit Button */}
          <button
            onClick={handleGeneratePdf}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Generating PDF...' : 'Generate PDF'}
          </button>

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
                download="generated.pdf"
                className="text-blue-600 hover:underline"
              >
                Click here to download your PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
