// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  instagramId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  accountType: { type: String },
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
  postsCount: { type: Number, default: 0 },
  biography: { type: String },
  profilePictureUrl: { type: String },
  accessToken: { type: String }, // Store securely (encrypt in prod)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);