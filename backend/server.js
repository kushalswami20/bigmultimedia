// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
dotenv.config();
const app = express();

// ✅ Define allowed origins for both local and production
const allowedOrigins = [
  "https://bigmultimedia-psfb.vercel.app",
  "http://localhost:5173"
];

// ✅ Use dynamic CORS configuration with proper error handling
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Optional: security header
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'unload=()');
  next();
});

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/webhook', require('./src/routes/webhook'));
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/subscriptions', require('./src/routes/subscriptions'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
