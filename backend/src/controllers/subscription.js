const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Subscription = require('../models/Subscription');
const Payment = require('../models/Payment');
const User = require('../models/User'); // Make sure you have User model
const SUBSCRIPTION_PLANS = require('../config/subscriptionPlans');

// Create checkout session (redirect to Stripe)
exports.createCheckoutSession = async (req, res) => {
  try {
    const { plan } = req.body;
    const userId = req.userId;

    if (!SUBSCRIPTION_PLANS[plan]) {
      return res.status(400).json({ error: 'Invalid plan selected' });
    }

    // Check existing subscription
    const existingSub = await Subscription.findOne({
      userId,
      status: 'active'
    });

    if (existingSub) {
      return res.status(400).json({ error: 'User already has active subscription' });
    }

    // Create or retrieve Stripe customer
    let customer;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.stripeCustomerId) {
      customer = await stripe.customers.retrieve(user.stripeCustomerId);
    } else {
      customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: userId.toString() }
      });
      user.stripeCustomerId = customer.id;
      await user.save();
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: SUBSCRIPTION_PLANS[plan].stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard?cancelled=true`,
      metadata: {
        userId: userId.toString(),
        plan
      }
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error('Checkout session creation error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get user subscription
exports.getUserSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      userId: req.userId,
      status: 'active'
    });

    if (!subscription) {
      return res.status(404).json({ error: 'No active subscription found' });
    }

    res.json({ subscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel subscription
exports.cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      userId: req.userId,
      status: 'active'
    });

    if (!subscription) {
      return res.status(404).json({ error: 'No active subscription found' });
    }

    // Cancel at period end
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true
    });

    subscription.cancelAtPeriodEnd = true;
    await subscription.save();

    res.json({ 
      message: 'Subscription will be cancelled at period end',
      subscription 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update subscription plan
exports.updateSubscription = async (req, res) => {
  try {
    const { newPlan } = req.body;
    
    if (!SUBSCRIPTION_PLANS[newPlan]) {
      return res.status(400).json({ error: 'Invalid plan selected' });
    }

    const subscription = await Subscription.findOne({
      userId: req.userId,
      status: 'active'
    });

    if (!subscription) {
      return res.status(404).json({ error: 'No active subscription found' });
    }

    if (subscription.plan === newPlan) {
      return res.status(400).json({ error: 'Already on this plan' });
    }

    // Update Stripe subscription
    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription.stripeSubscriptionId
    );

    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      items: [{
        id: stripeSubscription.items.data[0].id,
        price: SUBSCRIPTION_PLANS[newPlan].stripePriceId
      }],
      proration_behavior: 'create_prorations'
    });

    subscription.plan = newPlan;
    subscription.price = SUBSCRIPTION_PLANS[newPlan].price;
    await subscription.save();

    res.json({ 
      message: 'Subscription updated successfully',
      subscription 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reactivate subscription
exports.reactivateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      userId: req.userId,
      status: 'active',
      cancelAtPeriodEnd: true
    });

    if (!subscription) {
      return res.status(404).json({ error: 'No subscription to reactivate' });
    }

    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: false
    });

    subscription.cancelAtPeriodEnd = false;
    await subscription.save();

    res.json({ 
      message: 'Subscription reactivated successfully',
      subscription 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get payment history
exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ payments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
