exports.formatUserResponse = (user) => {
  return {
    id: user._id,
    instagramId: user.instagramId,
    username: user.username,
    fullName: user.fullName,
    followers: user.followersCount,
    following: user.followingCount,
    posts: user.postsCount
  };
};

exports.isValidInstagramId = (id) => {
  return /^\d+$/.test(id);
};