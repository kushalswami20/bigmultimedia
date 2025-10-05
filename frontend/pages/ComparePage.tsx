import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockData = [
    { name: 'Your Profile', followers: 677, engagement: 8.2, reach: 1200, posts: 89 },
    { name: 'Competitor A', followers: 1200, engagement: 7.5, reach: 2500, posts: 150 },
    { name: 'Competitor B', followers: 850, engagement: 9.1, reach: 900, posts: 60 },
];

const ComparePage: React.FC = () => {
    const [users, setUsers] = useState(mockData);
    const [newUserHandle, setNewUserHandle] = useState('');

    const addUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (newUserHandle && users.length < 5) {
            const newUser = {
                name: newUserHandle,
                followers: Math.floor(Math.random() * 2000),
                engagement: parseFloat((Math.random() * 5 + 5).toFixed(1)),
                reach: Math.floor(Math.random() * 3000),
                posts: Math.floor(Math.random() * 200),
            };
            setUsers([...users, newUser]);
            setNewUserHandle('');
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Compare Performance</h1>

            <form onSubmit={addUser} className="flex gap-4">
                <input
                    type="text"
                    value={newUserHandle}
                    onChange={(e) => setNewUserHandle(e.target.value)}
                    placeholder="Enter Instagram handle to add..."
                    className="flex-grow bg-bg-primary border border-border-color rounded-lg px-4 py-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none"
                />
                <button type="submit" className="px-5 py-2 bg-brand-blue rounded-lg font-semibold hover:opacity-90 transition-opacity">Add User</button>
            </form>

            <div className="overflow-x-auto bg-bg-primary border border-border-color rounded-xl p-4">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-border-color">
                            <th className="p-3">Profile</th>
                            <th className="p-3 text-center">Followers</th>
                            <th className="p-3 text-center">Engagement Score</th>
                            <th className="p-3 text-center">Avg. Reach</th>
                            <th className="p-3 text-center">Total Posts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.name} className={`border-b border-border-color last:border-b-0 ${index === 0 ? 'bg-brand-blue/10' : ''}`}>
                                <td className="p-3 font-semibold">{user.name}</td>
                                <td className="p-3 text-center">{user.followers.toLocaleString()}</td>
                                <td className="p-3 text-center">{user.engagement}</td>
                                <td className="p-3 text-center">{user.reach.toLocaleString()}</td>
                                <td className="p-3 text-center">{user.posts}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Follower & Reach Comparison</h2>
                <div className="w-full h-80 bg-bg-primary border border-border-color rounded-xl p-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={users} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#F9FAFB' }} />
                            <Legend />
                            <Bar dataKey="followers" fill="#3b82f6" />
                            <Bar dataKey="reach" fill="#22c55e" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ComparePage;