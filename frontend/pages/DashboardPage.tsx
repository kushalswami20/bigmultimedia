import React from 'react';
import { ArrowDownIcon, ArrowUpIcon, CommentIcon, FollowersIcon, HeartIcon, ReachIcon, SaveIcon, ShareIcon } from '../components/icons';

const DashboardPage: React.FC = () => {
    
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

    return (
        <div className="space-y-8">
            {/* Profile Header */}
            <div className="flex items-center space-x-6 p-6 bg-bg-primary rounded-xl border border-border-color">
                <div className="relative">
                    <img src="https://picsum.photos/seed/avatar/100/100" alt="User Avatar" className="w-24 h-24 rounded-full" />
                    <span className="absolute bottom-0 right-0 bg-brand-green text-black text-sm font-bold px-2 py-1 rounded-full border-2 border-bg-primary">8.2</span>
                </div>
                <div className="flex-grow">
                    <h2 className="text-2xl font-bold">@ishan_sharma_52</h2>
                    <p className="text-text-secondary">ISHΔN SHΔRMΔ</p>
                    <div className="flex space-x-6 mt-2 text-text-secondary">
                        <span><strong className="text-text-primary">677</strong> Followers</span>
                        <span><strong className="text-text-primary">89</strong> Posts</span>
                        <span><strong className="text-text-primary">697</strong> Following</span>
                    </div>
                </div>
                <button 
  className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors font-semibold"
  onClick={() => window.location.hash = '#analytics'}
>
  Profile analysis
</button>
            </div>
            
            {/* Analytics Section */}
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

            {/* Highlights */}
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

            {/* Reels Grid */}
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
        </div>
    );
};

export default DashboardPage;