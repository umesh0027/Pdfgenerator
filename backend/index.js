const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pdfRoutes = require('./routes/Pdfroutes');
const mergepdfRoutes = require('./routes/MergePdfroutes');
const compressPdfRoutes = require("./routes/CompressPDfroutes");
const path = require('path');
const dotenv = require("dotenv");
const app = express();


dotenv.config();

// Middlewares
app.use(cors({
  origin: "*", // Allow the frontend to make requests

}));
app.use(bodyParser.json());


// Routes
app.use('/api', pdfRoutes);
app.use('/api', mergepdfRoutes); 
app.use("/api/pdf", compressPdfRoutes);


app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT} PORT`);
});
