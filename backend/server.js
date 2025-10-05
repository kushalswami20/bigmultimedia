// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors'); // Add this

dotenv.config();

const app = express();
app.use('/api/webhook', require('./src/routes/webhook'));
// Middleware
app.use(cors({ origin: 'http://localhost:5173', 'https://bigmultimedia-psfb.vercel.app' })); // Allow requests from frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'unload=()'); // Allow unload if needed
  next();
});
// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://marketing:marketing@cluster0.c0szoww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));

app.use('/api/subscriptions', require('./src/routes/subscriptions'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});