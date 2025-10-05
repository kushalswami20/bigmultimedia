exports.validateUser = (req, res, next) => {
  const { instagramId, username } = req.body;
  
  if (!instagramId || !username) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'instagramId and username are required'
    });
  }
  
  next();
};
