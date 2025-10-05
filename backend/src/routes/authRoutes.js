// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const InstagramService = require('../services/instagramService');
const User = require('../models/User');
const Post = require('../models/Post');

router.post('/instagram/init', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  try {
    const authUrl = InstagramService.getAuthUrl(username);
    console.log('Generated Auth URL:', authUrl); // Log for debugging
    res.json({ authUrl });
  } catch (err) {
    console.error('Init Error:', err);
    res.status(500).json({ error: 'Failed to generate auth URL', details: err.message });
  }
});

router.get('/instagram/callback', async (req, res) => {
  const { code, state, error } = req.query;
  if (error) return res.status(400).json({ error: 'Authorization failed' });
  if (!code) return res.status(400).json({ error: 'No code provided' });

  try {
    const tokenResult = await InstagramService.exchangeCodeForToken(code, state);
    if (!tokenResult.success) return res.status(400).json({ error: tokenResult.error });

    const { accessToken, instagramAccountId, username } = tokenResult.data;

    // Fetch profile data
    const profileResult = await InstagramService.fetchUserData(accessToken, instagramAccountId);
    if (!profileResult.success) return res.status(400).json({ error: profileResult.error });

    const userData = profileResult.data;

    // Fetch media
    const mediaResult = await InstagramService.fetchMedia(accessToken, instagramAccountId);
    let postsData = [];
    if (mediaResult.success) {
      postsData = mediaResult.data.posts;
    }

    // Save user to DB
    let user = await User.findOneAndUpdate(
      { instagramId: userData.instagramId },
      { ...userData, accessToken, username }, // Include original username
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Save posts to DB
    if (postsData.length > 0) {
      await Post.insertMany(postsData.map(post => ({ ...post, userId: user._id })));
    }

    // Redirect to frontend with user data
    res.redirect(`https://bigmultimedia-psfb.vercel.app/?userId=${user._id}&username=${userData.username}`);
  } catch (err) {
    console.error('Callback Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to fetch user data for frontend
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const posts = await Post.find({ userId: user._id });
    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
