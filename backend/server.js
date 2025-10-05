// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

// ✅ Define allowed origins
const allowedOrigins = [
  "https://bigmultimedia-psfb.vercel.app",
  "http://localhost:5173"
];

// ✅ CORS Middleware - MUST BE FIRST
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  console.log('Incoming request:', {
    method: req.method,
    path: req.path,
    origin: origin
  });
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    console.log('✅ CORS headers set for origin:', origin);
  } else {
    console.log('❌ Origin not allowed:', origin);
  }
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request');
    return res.status(204).end();
  }
  
  next();
});

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security header
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'unload=()');
  next();
});

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/webhook', require('./src/routes/webhook'));
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/subscriptions', require('./src/routes/subscriptions'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Allowed origins:`, allowedOrigins);
});
