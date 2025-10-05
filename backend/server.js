// server.js (in root directory)
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// ✅ Allowed origins
const allowedOrigins = [
  "https://bigmultimedia-psfb.vercel.app",
  "http://localhost:5173"
];

// ✅ CORS Handler - FIRST middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  console.log('📨 Request:', req.method, req.path, 'from origin:', origin);
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    console.log('✅ CORS allowed for:', origin);
  } else {
    console.log('❌ CORS blocked for:', origin);
  }
  
  if (req.method === 'OPTIONS') {
    console.log('⚡ Preflight handled');
    return res.status(204).end();
  }
  
  next();
});

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'unload=()');
  next();
});

// MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

// Routes
app.use('/api/webhook', require('./src/routes/webhook'));
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/subscriptions', require('./src/routes/subscriptions'));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    allowedOrigins 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('✅ Allowed origins:', allowedOrigins);
});
