const Subscription = require('../models/Subscription');

const checkSubscription = (requiredPlan) => {
  return async (req, res, next) => {
    try {
      const subscription = await Subscription.findOne({
        userId: req.userId,
        status: 'active'
      });

      if (!subscription) {
        return res.status(403).json({ error: 'Active subscription required' });
      }

      const planHierarchy = { basic: 1, medium: 2, premium: 3 };
      
      if (planHierarchy[subscription.plan] < planHierarchy[requiredPlan]) {
        return res.status(403).json({ 
          error: `${requiredPlan} subscription or higher required` 
        });
      }

      req.subscription = subscription;
      next();
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
};

module.exports = checkSubscription;