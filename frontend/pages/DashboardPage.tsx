import React, { useState, useEffect } from 'react';
import { ArrowDownIcon, ArrowUpIcon, CommentIcon, FollowersIcon, HeartIcon, ReachIcon, SaveIcon, ShareIcon } from '../components/icons';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const SubscriptionModalContent = ({ onClose, userSubscription, onSubscriptionUpdate }) => {
    const [selectedPlan, setSelectedPlan] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const stripe = useStripe();
    const elements = useElements();

    const plans = [
        {
            id: 'basic',
            name: 'Basic',
            price: 9.99,
            features: ['Access to basic analytics', '7 days data history', 'Up to 50 posts tracking', 'Email support']
        },
        {
            id: 'medium',
            name: 'Medium',
            price: 19.99,
            popular: true,
            features: ['All Basic features', '30 days data history', 'Unlimited posts tracking', 'Advanced insights', 'Priority email support']
        },
        {
            id: 'premium',
            name: 'Premium',
            price: 29.99,
            features: ['All Medium features', '90 days data history', 'AI-powered recommendations', 'Competitor analysis', 'Export reports', '24/7 priority support']
        }
    ];

    const handleSubscribe = async () => {
        if (!selectedPlan) {
            setError('Please select a plan');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/subscriptions/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ plan: selectedPlan })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to create checkout session');

            // Redirect to Stripe Checkout
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleUpgrade = async () => {
        if (!selectedPlan) return;
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/subscriptions/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ newPlan: selectedPlan })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Update failed');

            alert('Plan updated successfully!');
            onSubscriptionUpdate();
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!confirm('Are you sure you want to cancel your subscription?')) return;
        setLoading(true);
        
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/subscriptions/cancel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Cancellation failed');

            alert('Subscription will be cancelled at period end');
            onSubscriptionUpdate();
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-bg-surface rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border-color flex justify-between items-center sticky top-0 bg-bg-surface">
                <h2 className="text-2xl font-bold">{userSubscription ? 'Manage Subscription' : 'Choose Your Plan'}</h2>
                <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="p-6">
                {userSubscription && (
                    <div className="mb-6 p-4 bg-brand-blue/10 rounded-lg border border-brand-blue/30">
                        <p className="text-sm text-text-secondary">Current Plan</p>
                        <p className="text-xl font-bold capitalize">{userSubscription.plan}</p>
                        <p className="text-sm text-text-secondary mt-1">
                            {userSubscription.cancelAtPeriodEnd 
                                ? `Cancels on ${new Date(userSubscription.currentPeriodEnd).toLocaleDateString()}`
                                : `Renews on ${new Date(userSubscription.currentPeriodEnd).toLocaleDateString()}`}
                        </p>
                    </div>
                )}

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {plans.map(plan => (
                        <div 
                            key={plan.id}
                            className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                                selectedPlan === plan.id ? 'border-brand-blue bg-brand-blue/5' : 'border-border-color hover:border-brand-blue/50'
                            } ${plan.popular ? 'ring-2 ring-brand-green' : ''}`}
                            onClick={() => setSelectedPlan(plan.id)}
                        >
                            {plan.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-green text-black text-xs font-bold px-3 py-1 rounded-full">
                                    POPULAR
                                </span>
                            )}
                            <div className="text-center mb-4">
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <div className="flex items-baseline justify-center">
                                    <span className="text-4xl font-bold">${plan.price}</span>
                                    <span className="text-text-secondary ml-2">/month</span>
                                </div>
                            </div>
                            <ul className="space-y-3">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start text-sm">
                                        <svg className="w-5 h-5 text-brand-green mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">{error}</div>
                )}

                {!userSubscription && (
                    <div className="space-y-4">
                        <div className="p-4 bg-bg-primary rounded-lg border border-border-color">
                            <label className="block text-sm font-semibold mb-2">Card Details</label>
                            <CardElement options={{ style: { base: { fontSize: '16px', color: '#ffffff', '::placeholder': { color: '#6b7280' } } } }} />
                        </div>
                        <button
                            onClick={handleSubscribe}
                            disabled={!selectedPlan || loading || !stripe}
                            className="w-full bg-brand-blue hover:bg-brand-blue/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
                        >
                            {loading ? 'Processing...' : `Subscribe to ${selectedPlan ? plans.find(p => p.id === selectedPlan)?.name : 'Plan'}`}
                        </button>
                    </div>
                )}

                {userSubscription && (
                    <div className="flex gap-4">
                        {selectedPlan && selectedPlan !== userSubscription.plan && (
                            <button
                                onClick={handleUpgrade}
                                disabled={loading}
                                className="flex-1 bg-brand-blue hover:bg-brand-blue/80 disabled:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors"
                            >
                                {loading ? 'Processing...' : 'Change Plan'}
                            </button>
                        )}
                        {!userSubscription.cancelAtPeriodEnd && (
                            <button
                                onClick={handleCancel}
                                disabled={loading}
                                className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-bold py-3 rounded-lg transition-colors"
                            >
                                Cancel Subscription
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const DashboardPage = () => {
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const [userSubscription, setUserSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const stats = [
        { label: 'Likes', value: '6', icon: HeartIcon },
        { label: 'Comments', value: '0', icon: CommentIcon },
        { label: 'Saves', value: '0', icon: SaveIcon },
        { label: 'Shares', value: '0', icon: ShareIcon },
    ];
    
    const highlights = [
        { title: 'Reel Engagement Surge', value: '4283', change: 'by day', changeType: 'positive', description: 'Reel on 2025-08-14 hit 4283 reach.' },
        { title: 'Followers Dip', value: '-3', change: 'by day', changeType: 'negative', description: 'Net loss of 3 followers on 2025-08-28.' },
        { title: 'Story Reach Peak', value: '331', change: 'by day', changeType: 'positive', description: 'Story reached 331 on 2025-08-18.' },
        { title: 'Engagement Drop', value: '-6', change: 'by day', changeType: 'negative', description: 'Engagement dropped to 6 on 2025-08-28.' },
    ];

    const reels = [
        { reach: '1.9K', likes: '200', comments: '0', shares: '8', engagement: '12%', score: '10.0', img: 'https://picsum.photos/seed/reel1/200/300'},
        { reach: '599', likes: '56', comments: '0', shares: '1', engagement: '10%', score: '5.7', img: 'https://picsum.photos/seed/reel2/200/300'},
        { reach: '1.1K', likes: '139', comments: '5', shares: '10', engagement: '15%', score: '8.8', img: 'https://picsum.photos/seed/reel3/200/300'},
        { reach: '517', likes: '51', comments: '0', shares: '2', engagement: '10%', score: '5.2', img: 'https://picsum.photos/seed/reel4/200/300'},
        { reach: '858', likes: '82', comments: '2', shares: '3', engagement: '10%', score: '7.0', img: 'https://picsum.photos/seed/reel5/200/300'},
        { reach: '1.2k', likes: '110', comments: '12', shares: '4', engagement: '11%', score: '9.1', img: 'https://picsum.photos/seed/reel6/200/300'},
    ];

    useEffect(() => {
        fetchSubscription();
    }, []);

    const fetchSubscription = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/subscriptions/current', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setUserSubscription(data.subscription);
            }
        } catch (error) {
            console.error('Error fetching subscription:', error);
        } finally {
            setLoading(false);
        }
    };

    const getSubscriptionBadge = () => {
        if (!userSubscription) {
            return <span className="text-xs bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full">Free</span>;
        }
        
        const colors = {
            basic: 'bg-blue-500/20 text-blue-400',
            medium: 'bg-purple-500/20 text-purple-400',
            premium: 'bg-yellow-500/20 text-yellow-400'
        };

        return (
            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${colors[userSubscription.plan]}`}>
                {userSubscription.plan.toUpperCase()}
            </span>
        );
    };

    return (
        <div className="space-y-8">
            {!userSubscription && (
                <div className="bg-bg-primary from-brand-blue/20 to-brand-green/20 border border-brand-blue/30 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">🚀 Unlock Premium Analytics</h3>
                            <p className="text-text-secondary">Get advanced insights, longer data history, and AI-powered recommendations</p>
                        </div>
                        <button
                            onClick={() => setShowSubscriptionModal(true)}
                            className="bg-brand-blue hover:bg-brand-blue/80 text-white font-bold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
                        >
                            View Plans
                        </button>
                    </div>
                </div>
            )}

            <div className="flex items-center space-x-6 p-6 bg-bg-primary rounded-xl border border-border-color">
                <div className="relative">
                    <img src="https://picsum.photos/seed/avatar/100/100" alt="User Avatar" className="w-24 h-24 rounded-full" />
                    <span className="absolute bottom-0 right-0 bg-brand-green text-black text-sm font-bold px-2 py-1 rounded-full border-2 border-bg-primary">8.2</span>
                </div>
                <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold">@ishan_sharma_52</h2>
                        {getSubscriptionBadge()}
                    </div>
                    <p className="text-text-secondary">ISHΔN SHΔRMΔ</p>
                    <div className="flex space-x-6 mt-2 text-text-secondary">
                        <span><strong className="text-text-primary">677</strong> Followers</span>
                        <span><strong className="text-text-primary">89</strong> Posts</span>
                        <span><strong className="text-text-primary">697</strong> Following</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <button 
                        className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors font-semibold"
                        onClick={() => window.location.hash = '#analytics'}
                    >
                        Profile analysis
                    </button>
                    <button
                        onClick={() => setShowSubscriptionModal(true)}
                        className="bg-brand-blue/20 border border-brand-blue px-4 py-2 rounded-lg hover:bg-brand-blue/30 transition-colors font-semibold text-sm"
                    >
                        {userSubscription ? 'Manage Plan' : 'Upgrade'}
                    </button>
                </div>
            </div>
            
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Last 7 days</h3>
                    <div className="flex items-center gap-1 p-1 bg-bg-primary rounded-lg">
                        <button className="px-3 py-1 text-sm rounded-md text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors">1</button>
                        <button className="px-3 py-1 text-sm rounded-md bg-brand-blue text-white">7</button>
                        <button className="px-3 py-1 text-sm rounded-md text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors">14</button>
                        <button className="px-3 py-1 text-sm rounded-md text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors">28</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 bg-bg-primary rounded-xl border border-border-color space-y-3">
                        <div className="flex items-center text-text-secondary"><FollowersIcon className="w-5 h-5 mr-2" /><span>Followers</span></div>
                        <div className="flex items-end gap-2">
                           <p className="text-3xl font-bold">681</p>
                           <p className="text-red-400 font-semibold flex items-center"><ArrowDownIcon className="w-4 h-4"/> 7</p>
                        </div>
                        <div className="text-sm space-y-1 text-text-secondary">
                            <div className="flex justify-between"><span>New</span><span className="text-text-primary font-semibold">10</span></div>
                            <div className="flex justify-between"><span>Lost</span><span className="text-text-primary font-semibold">8</span></div>
                        </div>
                    </div>
                    <div className="p-4 bg-bg-primary rounded-xl border border-border-color space-y-3">
                        <div className="flex items-center text-text-secondary"><ReachIcon className="w-5 h-5 mr-2" /><span>Reach</span></div>
                         <div className="flex items-end gap-2">
                           <p className="text-3xl font-bold">1.2K</p>
                           <p className="text-red-400 font-semibold flex items-center"><ArrowDownIcon className="w-4 h-4"/> 3.9K</p>
                        </div>
                        <div className="text-sm space-y-1 text-text-secondary">
                            <div className="flex justify-between"><span>Followers</span><span className="text-text-primary font-semibold">1.1K</span></div>
                            <div className="flex justify-between"><span>Non-followers</span><span className="text-text-primary font-semibold">105</span></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map(stat => (
                             <div key={stat.label} className="p-3 bg-bg-primary rounded-xl border border-border-color flex flex-col justify-center items-center">
                                <stat.icon className="w-6 h-6 text-text-secondary mb-2" />
                                <p className="text-xl font-bold">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {highlights.map(item => (
                    <div key={item.title} className="p-4 bg-bg-primary rounded-xl border border-border-color">
                        <p className="font-semibold mb-2">{item.title}</p>
                        <div className="flex items-baseline gap-2 mb-2">
                            <p className="text-2xl font-bold">{item.value}</p>
                            <p className="text-sm text-text-secondary">{item.change}</p>
                        </div>
                        <p className={`text-sm ${item.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>{item.description}</p>
                    </div>
                ))}
            </div>

            <div>
                <h3 className="text-xl font-bold mb-4">Reels Performance</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {reels.map((reel, index) => (
                        <div key={index} className="bg-bg-primary rounded-xl border border-border-color p-3">
                            <div className="relative mb-2">
                                <img src={reel.img} alt={`Reel ${index+1}`} className="w-full h-48 object-cover rounded-lg"/>
                                <span className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-full">{reel.score}</span>
                            </div>
                            <div className="text-xs space-y-1 text-text-secondary">
                                <p>Reach: <strong className="text-text-primary">{reel.reach}</strong></p>
                                <p>Likes: <strong className="text-text-primary">{reel.likes}</strong></p>
                                <p>Comments: <strong className="text-text-primary">{reel.comments}</strong></p>
                                <p>Engagement: <strong className="text-brand-green">{reel.engagement}</strong></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showSubscriptionModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <Elements stripe={stripePromise}>
                        <SubscriptionModalContent 
                            onClose={() => setShowSubscriptionModal(false)}
                            userSubscription={userSubscription}
                            onSubscriptionUpdate={fetchSubscription}
                        />
                    </Elements>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;