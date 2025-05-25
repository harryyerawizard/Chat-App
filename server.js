const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (CSS, JS, images)
app.use(express.static(__dirname + '/public'));

// Connect to MongoDB Atlas
const mongoURI = 'mongodb+srv://amandaborson56:Adatabase1@cluster0.myeqr0r.mongodb.net/chatapp?retryWrites=true&w=majority';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(error => console.log('Error connecting to MongoDB Atlas:', error));

// Import the employee routes
const employeesRoutes = require('./routes/employees');

// Register the employee routes
app.use('/employees', employeesRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
