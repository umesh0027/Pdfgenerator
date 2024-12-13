// import React from "react";
// import { Link } from "react-router-dom";
// import Navbar from "./Navbar";
// const About = () => {
//   return (
//     <>
//     <Navbar/>
//     <div className="bg-blue-250 min-h-screen p-6 flex flex-col justify-center items-center">
//       <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6 md:p-10">
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6">
//           About <Link to="/" className="text-pink-600">PDF</Link>
//           <Link to="/" className="text-blue-400">ify</Link>
//         </h1>
        // <p className="text-gray-700 text-lg md:text-xl text-center leading-relaxed">
        //   Welcome to <strong>PDFify</strong>, your one-stop solution for managing PDF files. 
        //   Our mission is to make document processing simple, fast, and accessible for everyone. 
        //   Whether you're converting PDFs to JPGs or merging multiple PDFs, PDFify has you covered.
        // </p>

//         {/* Features Section */}
//         <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-8 mb-4">
//           Features of PDFify
//         </h2>
//         <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
//           <li>Fast and secure PDF-to-JPG conversion.</li>
//           <li>Effortlessly merge multiple PDFs into one.</li>
//           <li>No need to install additional software.</li>
//           <li>Download your processed files instantly.</li>
//           <li>Completely free and easy to use.</li>
//         </ul>

//         {/* Merge PDF Section */}
        // <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-8 mb-4">
        //   Merge PDFs with Ease
        // </h2>
        // <p className="text-gray-700 text-lg leading-relaxed">
        //   Do you need to combine multiple PDFs into a single file? With <strong>PDFify</strong>, 
        //   merging PDFs is as simple as uploading your files and clicking a button. We ensure a 
        //   seamless process with no quality loss, and your combined document will be ready for 
        //   download in seconds.
        // </p>
        // <p className="text-gray-700 text-lg leading-relaxed mt-4">
        //   Perfect for professionals, students, and anyone looking to streamline their document 
        //   organization, our merge tool simplifies the process of creating unified PDFs.
        // </p>

        // {/* Why Choose PDFify */}
        // <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-8 mb-4">
        //   Why Choose PDFify?
        // </h2>
        // <p className="text-gray-700 text-lg leading-relaxed">
        //   At <strong>PDFify</strong>, we prioritize user convenience and data privacy. Our tools 
        //   are designed for anyone looking to quickly and effortlessly process their PDFs without 
        //   the hassle of downloading software or plugins.
        // </p>

//         {/* Call to Action */}
//         <div className="mt-10 text-center">
//           <button className="px-6 py-3 bg-blue-400 text-white font-semibold text-lg rounded-lg shadow hover:bg-blue-600 transition">
//             Get Started Now
//           </button>
//         </div>
//       </div>
//     </div>
    
//     </>
//   );
// };

// export default About;



import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
const About = () => {
  const featureList = [
    "Fast and secure PDF-to-JPG conversion.",
    "Effortlessly merge multiple PDFs into one.",
    "No need to install additional software.",
    "Download your processed files instantly.",
    "Completely free and easy to use.",
  ];

  return (
   <>

   <Navbar/>
    <div className="bg-gradient-to-br from-blue-250 to-richblack-100 min-h-screen py-10 px-4 md:px-8">
      <motion.div
        className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 md:p-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header Section */}
        <motion.h1
          className="text-3xl md:text-3xl font-bold text-gray-800 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <Link to="/" className="text-pink-600 hover:underline">PDF</Link>
                    <Link to="/" className="text-blue-400 hover:underline">ify</Link>
        </motion.h1>
        <motion.p
          className="text-gray-600 text-lg md:text-xl text-center mt-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
         
          <p className="text-gray-700 text-base  text-center leading-relaxed">
          Welcome to <strong>PDFify</strong>, your one-stop solution for managing PDF files. 
          Our mission is to make document processing simple, fast, and accessible for everyone. 
          Whether you're converting PDFs to JPGs or merging multiple PDFs, PDFify has you covered.
        </p>
       <p className="text-base"> The ultimate platform for all your PDF processing needs. Fast, free, 
       and user-friendly!</p>
        </motion.p>

        {/* Features Section */}
        <motion.div
          className="mt-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Features You'll Love
          </h2>
          <ul className="space-y-4">
            {featureList.map((feature, index) => (
              <motion.li
                key={index}
                className="text-gray-700 text-lg flex items-center"
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <span className="w-4 h-4 mr-3 bg-blue-600 rounded-full"></span>
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-8 mb-4">
          Merge PDFs with Ease
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Do you need to combine multiple PDFs into a single file? With <strong>PDFify</strong>, 
          merging PDFs is as simple as uploading your files and clicking a button. We ensure a 
          seamless process with no quality loss, and your combined document will be ready for 
          download in seconds.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          Perfect for professionals, students, and anyone looking to streamline their document 
          organization, our merge tool simplifies the process of creating unified PDFs.
        </p>
        </motion.div>

        {/* Animated Statistics */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { label: "Users Served", value: "1000+" },
            { label: "PDFs Processed", value: "5000+" },
            { label: "Countries Reached", value: "10+" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-6 bg-blue-50 rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="text-4xl font-bold text-blue-600">{stat.value}</h3>
              <p className="text-pure-greys-700 mt-2">{stat.label}</p>

              
            </motion.div>
          ))}
        </div>


        <motion.div  className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>

            
        {/* Why Choose PDFify */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-8 mb-4">
          Why Choose PDFify?
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          At <strong>PDFify</strong>, we prioritize user convenience and data privacy. Our tools 
          are designed for anyone looking to quickly and effortlessly process their PDFs without 
          the hassle of downloading software or plugins.
        </p>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            What Our Users Say
          </h2>
          <div className="space-y-6">
            {[
              {
                name: "Ravi Sharma",
                text: "PDFify is an absolute lifesaver! Merging PDFs has never been this easy.",
              },
              {
                name: "Ram ",
                text: "I love how fast and simple the tools are. Highly recommend PDFify!",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white shadow-lg rounded-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
                <p className="text-gray-900 font-semibold mt-3">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      

        {/* Call-to-Action Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <button className="px-8 py-3 bg-blue-400 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-all">
            Get Started Now
          </button>
        </motion.div>
      </motion.div>
    </div>
   
   </>
  );
};

export default About;
