const instagramService = require('../services/instagramService');
const User = require('../models/User');
const Post = require('../models/Post');

// Fetch and save user data using access token (Official API)
exports.fetchAndSaveUserOfficial = async (req, res, next) => {
  try {
    const { accessToken } = req.body;
    
    if (!accessToken) {
      return res.status(400).json({ error: 'Access token is required' });
    }

    // Fetch user data from Instagram
    const result = await instagramService.fetchUserDataOfficial(accessToken);
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    // Save to database
    const user = await User.findOneAndUpdate(
      { instagramId: result.data.instagramId },
      {
        ...result.data,
        lastFetched: new Date(),
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: 'User data fetched and saved successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};

// Fetch and save user data using username (Third-party API)


// Fetch and save user posts
exports.fetchAndSaveUserPosts = async (req, res, next) => {
  try {
    const { accessToken, instagramId } = req.body;
    
    if (!accessToken || !instagramId) {
      return res.status(400).json({ 
        error: 'Access token and instagramId are required' 
      });
    }

    // Check if user exists
    const user = await User.findOne({ instagramId });
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found. Fetch user data first.' 
      });
    }

    // Fetch posts from Instagram
    const result = await instagramService.fetchUserMediaOfficial(accessToken);
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    // Save posts to database
    const savedPosts = [];
    for (const postData of result.data) {
      const post = await Post.findOneAndUpdate(
        { postId: postData.postId },
        {
          ...postData,
          userId: user._id,
          instagramId
        },
        { upsert: true, new: true }
      );
      savedPosts.push(post);
    }

    res.json({
      success: true,
      message: `${savedPosts.length} posts fetched and saved`,
      posts: savedPosts
    });
  } catch (error) {
    next(error);
  }
};
