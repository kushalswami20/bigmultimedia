const SUBSCRIPTION_PLANS = {
  basic: {
    name: 'Basic',
    price: 9.99,
    stripePriceId: process.env.STRIPE_BASIC_PRICE_ID,
    features: ['Feature 1', 'Feature 2', 'Feature 3']
  },
  medium: {
    name: 'Medium',
    price: 19.99,
    stripePriceId: process.env.STRIPE_MEDIUM_PRICE_ID,
    features: ['All Basic features', 'Feature 4', 'Feature 5']
  },
  premium: {
    name: 'Premium',
    price: 29.99,
    stripePriceId: process.env.STRIPE_PREMIUM_PRICE_ID,
    features: ['All Medium features', 'Feature 6', 'Feature 7', 'Priority Support']
  }
};

module.exports = SUBSCRIPTION_PLANS;