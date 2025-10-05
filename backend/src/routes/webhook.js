const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Subscription = require('../models/Subscription');
const Payment = require('../models/Payment');
const SUBSCRIPTION_PLANS = require('../config/subscriptionPlans');

router.post('/stripe', 
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed':
          await handleCheckoutCompleted(event.data.object);
          break;

        case 'invoice.payment_succeeded':
          await handlePaymentSucceeded(event.data.object);
          break;

        case 'invoice.payment_failed':
          await handlePaymentFailed(event.data.object);
          break;

        case 'customer.subscription.updated':
          await handleSubscriptionUpdated(event.data.object);
          break;

        case 'customer.subscription.deleted':
          await handleSubscriptionDeleted(event.data.object);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook handler error:', error);
      res.status(500).json({ error: 'Webhook handler failed' });
    }
  }
);

async function handleCheckoutCompleted(session) {
  const userId = session.metadata.userId;
  const plan = session.metadata.plan;
  
  // Retrieve the subscription
  const stripeSubscription = await stripe.subscriptions.retrieve(session.subscription);

  // Create subscription record
  const subscription = new Subscription({
    userId,
    plan,
    status: 'active',
    stripeSubscriptionId: stripeSubscription.id,
    stripeCustomerId: session.customer,
    currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
    currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
    price: SUBSCRIPTION_PLANS[plan].price
  });

  await subscription.save();

  // Create payment record
  await Payment.create({
    userId,
    subscriptionId: subscription._id,
    stripePaymentIntentId: session.payment_intent,
    amount: SUBSCRIPTION_PLANS[plan].price,
    status: 'succeeded'
  });
}

async function handlePaymentSucceeded(invoice) {
  const subscription = await Subscription.findOne({
    stripeSubscriptionId: invoice.subscription
  });

  if (subscription) {
    subscription.status = 'active';
    await subscription.save();

    // Record payment
    await Payment.create({
      userId: subscription.userId,
      subscriptionId: subscription._id,
      stripePaymentIntentId: invoice.payment_intent,
      amount: invoice.amount_paid / 100,
      status: 'succeeded'
    });
  }
}

async function handlePaymentFailed(invoice) {
  const subscription = await Subscription.findOne({
    stripeSubscriptionId: invoice.subscription
  });

  if (subscription) {
    subscription.status = 'past_due';
    await subscription.save();

    await Payment.create({
      userId: subscription.userId,
      subscriptionId: subscription._id,
      amount: invoice.amount_due / 100,
      status: 'failed'
    });
  }
}

async function handleSubscriptionUpdated(stripeSubscription) {
  const subscription = await Subscription.findOne({
    stripeSubscriptionId: stripeSubscription.id
  });

  if (subscription) {
    subscription.status = stripeSubscription.status;
    subscription.currentPeriodStart = new Date(stripeSubscription.current_period_start * 1000);
    subscription.currentPeriodEnd = new Date(stripeSubscription.current_period_end * 1000);
    subscription.cancelAtPeriodEnd = stripeSubscription.cancel_at_period_end;
    await subscription.save();
  }
}

async function handleSubscriptionDeleted(stripeSubscription) {
  const subscription = await Subscription.findOne({
    stripeSubscriptionId: stripeSubscription.id
  });

  if (subscription) {
    subscription.status = 'cancelled';
    await subscription.save();
  }
}

module.exports = router;
