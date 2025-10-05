const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription');
const authMiddleware = require('../middlewares/auth');
const checkSubscription = require('../middlewares/checkSubscription');

// All routes require authentication
router.use(authMiddleware);

// Subscription management
router.post('/create-checkout', subscriptionController.createCheckoutSession);
router.get('/current', subscriptionController.getUserSubscription);
router.post('/cancel', subscriptionController.cancelSubscription);
router.post('/update', subscriptionController.updateSubscription);
router.post('/reactivate', subscriptionController.reactivateSubscription);
router.get('/payments', subscriptionController.getPaymentHistory);

// Example protected route requiring specific plan
router.get('/premium-feature', 
  checkSubscription('premium'), 
  (req, res) => {
    res.json({ message: 'Access granted to premium feature' });
  }
);

module.exports = router;