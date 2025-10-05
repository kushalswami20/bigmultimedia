const User = require('../models/User');
const Post = require('../models/Post');

exports.createOrUpdateUser = async (req, res, next) => {
  try {
    const { instagramId, username, ...otherData } = req.body;
    
    if (!instagramId || !username) {
      return res.status(400).json({ 
        error: 'instagramId and username are required' 
      });
    }

    const user = await User.findOneAndUpdate(
      { instagramId },
      {
        instagramId,
        username,
        ...otherData,
        lastFetched: new Date(),
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.json({ 
      success: true, 
      message: 'User saved successfully',
      user 
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ 
      instagramId: req.params.instagramId 
    });
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ 
      instagramId: req.params.instagramId 
    });
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    // Delete associated posts
    await Post.deleteMany({ instagramId: req.params.instagramId });

    res.json({ 
      success: true, 
      message: 'User and associated posts deleted' 
    });
  } catch (error) {
    next(error);
  }
};
