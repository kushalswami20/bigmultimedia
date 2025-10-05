const Post = require('../models/Post');
const User = require('../models/User');

exports.savePosts = async (req, res, next) => {
  try {
    const { posts, instagramId } = req.body;
    
    if (!posts || !Array.isArray(posts)) {
      return res.status(400).json({ 
        error: 'posts array is required' 
      });
    }

    const user = await User.findOne({ instagramId });
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found. Please save user first.' 
      });
    }

    const savedPosts = [];
    for (const postData of posts) {
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
      message: `${savedPosts.length} posts saved`,
      posts: savedPosts 
    });
  } catch (error) {
    next(error);
  }
};

exports.getPostsByUser = async (req, res, next) => {
  try {
    const posts = await Post.find({ 
      instagramId: req.params.instagramId 
    }).sort({ timestamp: -1 });

    res.json({ 
      success: true, 
      count: posts.length,
      posts 
    });
  } catch (error) {
    next(error);
  }
};