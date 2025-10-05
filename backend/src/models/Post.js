// src/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  caption: { type: String },
  mediaType: { type: String },
  mediaUrl: { type: String },
  thumbnailUrl: { type: String },
  permalink: { type: String },
  timestamp: { type: Date },
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  rawData: { type: Object },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);