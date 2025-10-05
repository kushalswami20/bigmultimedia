import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubscriptionPlan } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRightIcon, CheckIcon } from '../components/icons';
import home from '../assets/home.png';
import ycomb from '../assets/logo-ycombinator.svg (1).png';
import coinbase from '../assets/logo-coinbase.svg (1).png';
import blockchange from '../assets/logo-blockchange.svg (1).png';
import a16z from '../assets/logo-a16z.png (1).png';
import robo1 from '../assets/robo1.png';
import robo2 from '../assets/robo2.png';
import robo3 from '../assets/robo3.png';
import design from '../assets/design.png';
import reflection from '../assets/reflection.png';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUnlockIdeas = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

const handleInstagramLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const response = await fetch('http://localhost:3000/api/auth/instagram/init', { // Updated URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const { authUrl } = await response.json();
    window.location.href = authUrl;
  } catch (err) {
    setError('Failed to initiate Instagram login');
  } finally {
    setLoading(false);
  }
};

  // Fetch user data after callback redirect (triggered by URL params)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    if (userId) {
      setLoading(true);
      fetch(`/api/users/${userId}`)
        .then(res => res.json())
        .then(data => {
          setUserData(data);
          return fetch(`/api/posts?userId=${userId}`);
        })
        .then(res => res.json())
        .then(data => setPosts(data))
        .catch(err => setError('Failed to load user data'))
        .finally(() => setLoading(false));
    }
  }, []);

  const subscriptionPlans: SubscriptionPlan[] = [
    { name: 'Starter Vault', price: '14.99', features: ['AI Idea Generation', 'Basic Analytics', 'Content Planner', 'Email Support'], highlight: false },
    { name: 'Mighty Vault', price: '39.99', features: ['Everything in Starter', 'Advanced Analytics', 'Competitor Tracking', 'Priority Support', '3 User Seats'], highlight: true },
    { name: 'Legendary Vault', price: '99.99', features: ['Everything in Mighty', 'API Access', 'Dedicated Account Manager', 'Unlimited Users'], highlight: false },
  ];
  
  const partners = ['coinbase', 'alo', 'OATLY', 'outreach'];
  const services = ['Product clarity', 'Maintain process', 'Business growth'];
  const trustPillars = ['Approved by Meta', '100% Secure Payments', 'One Click Data Removal', 'Easy API Access', 'Your Data Stays Yours', 'We are GDPR Safe'];

  return (
    <div className="bg-bg-primary text-text-primary">
      <Header />

      <main className="">
        {/* Hero Section */}
        <section className="-translate-x-12 relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0"></div>
          <div className="-translate-y-10 translate-x-5 z-10 grid md:grid-cols-2 gap-8 items-center w-full">
            <div className="w-full min-h-screen flex flex-col items-end justify-center px-10">
              <div className="flex flex-col items-end">
                <h2 className="text-5xl md:text-8xl font-medium">Design studio</h2>
                <h2 className="text-5xl md:text-8xl font-medium">for the</h2>
                <h2 className="text-5xl md:text-8xl font-medium">AI World</h2>
              </div>
            </div>
            <div className="relative h-[800px] w-[800px] flex items-center justify-center">
              <div className="-translate-x-5">
                <img src={home} alt="Mobile Mockup" className="w-auto h-full max-h-[80vh] object-contain" />
              </div>
            </div>
            <div className="mt-0 ml-8 w-2/3">
              <p className="text-lg font-regular text-text-secondary">
                We help companies design their products to be ready for web3 world
              </p>
            </div>
          </div>
        </section>
        
        {/* Partners Section */}
        <section className="py-20">
          <div className="w-full">
            <div className="flex justify-around items-center flex-wrap gap-8 px-8">
              <div className="flex items-center justify-center h-16 opacity-70 hover:opacity-100 transition-opacity">
                <img src={ycomb} alt="Y Combinator" className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all" />
              </div>
              <div className="flex items-center justify-center h-16 opacity-70 hover:opacity-100 transition-opacity">
                <img src={coinbase} alt="Coinbase" className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all" />
              </div>
              <div className="flex items-center justify-center h-16 opacity-70 hover:opacity-100 transition-opacity">
                <img src={a16z} alt="Andreessen Horowitz" className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all" />
              </div>
              <div className="flex items-center justify-center h-16 opacity-70 hover:opacity-100 transition-opacity">
                <img src={blockchange} alt="BlockChange" className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all" />
              </div>
            </div>
          </div>
        </section>

        {/* What is AI Studio? Section */}
        <section className="py-6">
          <div className="w-full px-8 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-medium mb-4 text-white">What is A.I studio?</h2>
              <p className="text-gray-400 text-2xl font-regular">
                At , we specialize in social media marketing tailored for AI startups. We help visionary AI companies build a strong digital presence, engage the right audience, and drive meaningful growth. From strategic content creation to data-driven campaigns, our team understands the nuances of the AI industry and crafts compelling narratives that resonate. Whether you're launching a new AI product or scaling your brand, we turn innovation into influence.
              </p>
            </div>
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <div className="-translate-x-10 w-full max-w-5xl h-full relative">
                <svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M150,200 C150,50 350,50 400,200 C450,350 650,350 650,200 C650,50 450,50 400,200 C350,350 150,350 150,200 Z" fill="none" stroke="white" strokeWidth="3" />
                  <text x="280" y="200" fill="white" fontFamily="Inter, sans-serif" fontSize="18" textAnchor="middle">Passion in the new<tspan x="280" y="220">wave of crypto</tspan></text>
                  <text x="520" y="200" fill="white" fontFamily="Inter, sans-serif" fontSize="18" textAnchor="middle">High-quality<tspan x="520" y="220">design craft</tspan></text>
                </svg>
                <img src={reflection} alt="Reflection" className="absolute -bottom-60 -right-20 object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Our Work Preview */}
        <section className="py-24 bg-black">
          <div className="w-full px-8">
            <h2 className="text-7xl font-medium mb-12 text-left text-white">Our Work</h2>
            <div className="flex gap-6 h-[800px]">
              <div className="flex-1 flex flex-col gap-6">
                <div className="h-[45%] overflow-hidden bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center">
                  <img src="https://i.ibb.co/3zdWfP5/work-1.png" className="w-auto h-full max-h-full object-contain drop-shadow-2xl" alt="Crypto Portfolio App" />
                </div>
                <div className="h-[45%] overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-300 flex items-center justify-center">
                  <div className="flex gap-4 items-center h-full">
                    <img src="https://i.ibb.co/2d1hS1r/work-3.png" className="w-auto h-[80%] object-contain drop-shadow-xl" alt="Analytics 1" />
                    <img src="https://i.ibb.co/2d1hS1r/work-3.png" className="w-auto h-[90%] object-contain drop-shadow-xl" alt="Analytics 2" />
                  </div>
                </div>
                <div className="h-[10%] bg-gray-900 flex flex-col justify-center p-4">
                  <h3 className="text-white text-lg font-semibold mb-1">How we design web3 products</h3>
                  <p className="text-gray-400 text-sm">coming soon</p>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex-[2] overflow-hidden bg-gradient-to-br from-purple-300 to-pink-200 flex items-center justify-center">
                  <img src="https://i.ibb.co/v4S6d1r/work-2.png" className="w-auto h-96 object-contain drop-shadow-2xl" alt="Worldcoin Beta App" />
                </div>
                <div className="flex-1 overflow-hidden bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-white text-3xl font-light">audience<span className="font-semibold">plus</span></h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <button onClick={() => navigate('/our-work')} className="px-8 py-3 bg-gradient-to-r from-brand-purple to-brand-blue text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
                See All Work
              </button>
            </div>
          </div>
        </section>
        <section>
          <img src={design} alt="design" className="w-full h-auto object-cover"/>
        </section>

        {/* How We Help Grow Section */}
        <section className="py-24">
          <div className="w-full px-8">
            <h2 className="text-7xl font-medium mb-12 text-left w-[40%] text-white">How we can help grow</h2>
            <div className="flex items-center justify-between">
              <div className="w-1/3 space-y-8">
                <img src={reflection} alt="Reflection" className="absolute bottom-90 -left-2 object-cover" style={{ transform: 'scaleX(-1)' }} />
                <div className="text-left">
                  <h3 className="text-3xl font-light text-white mb-2">Product clarity</h3>
                </div>
                <div className="text-left">
                  <h3 className="text-3xl font-light text-gray-300 mb-2">UX/UI design</h3>
                </div>
                <div className="text-left">
                  <h3 className="text-3xl font-light text-gray-400 mb-2">Maintain process</h3>
                </div>
              </div>
              <div className="w-1/3 flex justify-center">
                <div className="w-80 h-60 bg-gray-200 overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop" alt="Product design sketching" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="w-1/3 pl-12">
                <div className="space-y-6">
                  <p className="text-inter text-white text-lg font-regular">
                    Are you at the idea stage? We will help you identify the critical MVP product scope.
                  </p>
                  <div className="space-y-0 text-gray-400">
                    <p className="text-inter">Product goal&vision</p>
                    <p className="text-base">Brand voice</p>
                    <p className="text-base">Product positioning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Username Input Section */}
        <section className="py-12 bg-bg-primary">
          <div className="w-full px-8 text-center">
            <h2 className="text-4xl font-medium mb-6 text-white">Connect Your Instagram</h2>
            <form onSubmit={handleInstagramLogin} className="max-w-md mx-auto flex gap-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your Instagram username"
                className="flex-1 px-4 py-2 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-purple transition-colors"
                disabled={loading}
              >
                {loading ? 'Connecting...' : 'Connect'}
              </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </section>

        {/* Personalized AI Content Section */}
        <section className="py-24 bg-black">
          <div className="w-full px-8">
            <h2 className="text-6xl font-medium mb-16 text-white text-center">Personalized AI-Content</h2>
            {loading ? (
              <p className="text-center text-white">Loading your data...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error: {error}</p>
            ) : userData ? (
              <div className="mx-auto bg-white/10 overflow-hidden">
                {/* Profile Header */}
                <div className="bg-white/10 p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={userData.profilePictureUrl || 'https://via.placeholder.com/80'}
                        className="w-20 h-20 rounded-full mr-6"
                        alt={`${userData.username} profile`}
                      />
                      <div>
                        <h3 className="text-white text-xl font-medium">@{userData.username}</h3>
                        <p className="text-gray-300 text-lg mt-1">{userData.name || 'User'}</p>
                      </div>
                    </div>
                    <div className="flex gap-12 text-center">
                      <div>
                        <p className="text-white text-3xl font-bold">{userData.followersCount || 0}</p>
                        <p className="text-gray-400 text-sm mt-1">Followers</p>
                      </div>
                      <div>
                        <p className="text-white text-3xl font-bold">{userData.postsCount || 0}</p>
                        <p className="text-gray-400 text-sm mt-1">Posts</p>
                      </div>
                      <div>
                        <p className="text-white text-3xl font-bold">{userData.followingCount || 0}</p>
                        <p className="text-gray-400 text-sm mt-1">Following</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytics Section */}
                <div className="bg-black p-8">
                  <h3 className="text-white text-2xl font-medium mb-8">Last 7 days</h3>
                  <div className="grid grid-cols-2 gap-8">
                    {/* Followers Card */}
                    <div className="bg-white/10 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-white text-lg font-medium">Followers</h4>
                        <div className="text-right">
                          <p className="text-white text-2xl font-bold">{userData.followersCount || 0}</p>
                          <p className="text-gray-400 text-sm flex items-center gap-1">
                            <span>📈</span> {userData.followersCount ? 'N/A' : '0'} {/* Placeholder; requires insights API */}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-white text-4xl">👥</div>
                        <div className="flex-1">
                          <div className="flex justify-between text-gray-400 text-sm mb-2">
                            <span>New</span>
                            <span>N/A</span> {/* Requires insights API */}
                          </div>
                          <div className="flex justify-between text-gray-400 text-sm">
                            <span>Lost</span>
                            <span>N/A</span> {/* Requires insights API */}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reach Card */}
                    <div className="bg-white/10 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-white text-lg font-medium">Reach</h4>
                        <div className="text-right">
                          <p className="text-white text-2xl font-bold">N/A</p> {/* Requires insights API */}
                          <p className="text-gray-400 text-sm flex items-center gap-1">
                            <span>📈</span> N/A
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-white text-4xl">📢</div>
                        <div className="flex-1">
                          <div className="flex justify-between text-gray-400 text-sm mb-2">
                            <span>Followers</span>
                            <span>N/A</span>
                          </div>
                          <div className="flex justify-between text-gray-400 text-sm">
                            <span>Non-Followers</span>
                            <span>N/A</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-400">Connect your Instagram to see personalized content.</p>
            )}
          </div>
        </section>

        {/* Safe, Legal, Trusted Section */}
        <section className="py-24">
          <div className="w-full px-8">
            <h2 className="text-7xl font-bold mb-12 text-center">Safe. Legal. Trusted</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {trustPillars.map(pillar => (
                <div key={pillar} className="flex items-center">
                  <CheckIcon className="h-6 w-6 text-brand-green mr-3" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscription Plans Section */}
        <section className="py-24 bg-black">
          <div className="w-full px-8">
            <h2 className="text-6xl font-medium mb-20 text-center text-white">Subscription Plans</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white/10 rounded-3xl p-8 pt-24 relative overflow-visible">
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-10">
                  <img src={robo1} alt="Wall-E Robot" className="w-56 h-56 object-contain" />
                </div>
                <h3 className="text-white text-2xl font-bold text-center mb-2">Wall-E</h3>
                <p className="text-gray-400 text-center mb-4">For Profiles with up to 10k followers</p>
                <p className="text-white text-3xl font-bold text-center mb-8">$4.99/month</p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Arabic</li>
                  <li>• Bacon Ipsum</li>
                  <li>• Baseball Ipsum</li>
                  <li>• Bavaria Ipsum</li>
                  <li>• Beer Ipsum</li>
                  <li>• Bowie Ipsum</li>
                  <li>• Cheese Ipsum</li>
                  <li>• Corporate Ipsum</li>
                  <li>• Cupcake Ipsum</li>
                  <li>• Cyrillic</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-3xl p-8 pt-24 relative overflow-visible">
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-10">
                  <img src={robo2} alt="Mighty Wall-E Robot" className="w-56 h-56 object-contain" />
                </div>
                <h3 className="text-white text-2xl font-bold text-center mb-2">Mighty Wall-E</h3>
                <p className="text-gray-400 text-center mb-4">For Profiles with up to 100k followers</p>
                <p className="text-white text-3xl font-bold text-center mb-8">$9.99/month</p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Arabic</li>
                  <li>• Bacon Ipsum</li>
                  <li>• Baseball Ipsum</li>
                  <li>• Bavaria Ipsum</li>
                  <li>• Beer Ipsum</li>
                  <li>• Bowie Ipsum</li>
                  <li>• Cheese Ipsum</li>
                  <li>• Corporate Ipsum</li>
                  <li>• Cupcake Ipsum</li>
                  <li>• Cyrillic</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-3xl p-8 pt-24 relative overflow-visible">
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-10">
                  <img src={robo3} alt="Legendary Wall-E Robot" className="w-56 h-56 object-contain" />
                </div>
                <h3 className="text-white text-2xl font-bold text-center mb-2">Legendary Wall-E</h3>
                <p className="text-gray-400 text-center mb-4">For Profiles with up to 100k+ followers</p>
                <p className="text-white text-3xl font-bold text-center mb-8">$19.99/month</p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Arabic</li>
                  <li>• Bacon Ipsum</li>
                  <li>• Baseball Ipsum</li>
                  <li>• Bavaria Ipsum</li>
                  <li>• Beer Ipsum</li>
                  <li>• Bowie Ipsum</li>
                  <li>• Cheese Ipsum</li>
                  <li>• Corporate Ipsum</li>
                  <li>• Cupcake Ipsum</li>
                  <li>• Cyrillic</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;