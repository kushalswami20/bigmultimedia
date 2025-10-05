import React, { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// =================================================================================
// TYPES
// =================================================================================
interface DailyFollowerData {
  day: string;
  newFollowers: number;
  unfollowers: number;
}

interface GrowthData {
    month: string;
    rate: number;
}

interface LocationData {
    country: string;
    followers: number;
}

interface GenderData {
    gender: string;
    value: number;
}

interface AgeData {
    group: string;
    percentage: number;
}

interface EngagementData {
    metric: string;
    value: number;
    lastWeek: number;
}

interface ReachData {
    month: string;
    reach: number;
}

interface OnlineUsersData {
    day: string;
    users: number;
}

interface PredictedPost {
  id: number;
  day: string;
  time: string;
  content: string;
  postType: string;
  predictedEngagement: number;
  predictedReach: number;
  confidence: number;
  hashtags: string[];
}

// =================================================================================
// DUMMY DATA
// =================================================================================
const totalFollowers = 24879;

const followerTrendData: DailyFollowerData[] = [
  { day: 'Mon', newFollowers: 150, unfollowers: 30 },
  { day: 'Tue', newFollowers: 180, unfollowers: 25 },
  { day: 'Wed', newFollowers: 220, unfollowers: 40 },
  { day: 'Thu', newFollowers: 190, unfollowers: 22 },
  { day: 'Fri', newFollowers: 250, unfollowers: 35 },
  { day: 'Sat', newFollowers: 300, unfollowers: 15 },
  { day: 'Sun', newFollowers: 280, unfollowers: 18 },
];

const growthRateData: GrowthData[] = [
  { month: 'Jan', rate: 2.5 },
  { month: 'Feb', rate: 3.1 },
  { month: 'Mar', rate: 4.5 },
  { month: 'Apr', rate: 4.2 },
  { month: 'May', rate: 5.8 },
  { month: 'Jun', rate: 6.2 },
];

const locationData: LocationData[] = [
  { country: 'USA', followers: 8500 },
  { country: 'India', followers: 4200 },
  { country: 'UK', followers: 3100 },
  { country: 'Canada', followers: 2500 },
  { country: 'Brazil', followers: 1800 },
];

const genderData: GenderData[] = [
  { gender: 'Female', value: 58 },
  { gender: 'Male', value: 40 },
  { gender: 'Other', value: 2 },
];

const ageData: AgeData[] = [
  { group: '18-24', percentage: 35 },
  { group: '25-34', percentage: 45 },
  { group: '35-44', percentage: 15 },
  { group: '45+', percentage: 5 },
];

const engagementData: EngagementData[] = [
    { metric: 'Likes', value: 12500, lastWeek: 11800 },
    { metric: 'Comments', value: 3400, lastWeek: 3600 },
    { metric: 'Shares', value: 1800, lastWeek: 1500 },
];

const reachData: ReachData[] = [
    { month: 'Jan', reach: 50000 },
    { month: 'Feb', reach: 65000 },
    { month: 'Mar', reach: 80000 },
    { month: 'Apr', reach: 75000 },
    { month: 'May', reach: 95000 },
    { month: 'Jun', reach: 110000 },
];

const onlineUsersData: OnlineUsersData[] = [
    { day: 'Mon', users: 1200 },
    { day: 'Tue', users: 1500 },
    { day: 'Wed', users: 1800 },
    { day: 'Thu', users: 2100 },
    { day: 'Fri', users: 2500 },
    { day: 'Sat', users: 3200 },
    { day: 'Sun', users: 2800 },
];

const predictedPosts: PredictedPost[] = [
  {
    id: 1,
    day: 'Monday',
    time: '9:00 AM',
    content: 'Behind-the-scenes look at our creative process',
    postType: 'Carousel',
    predictedEngagement: 8500,
    predictedReach: 45000,
    confidence: 92,
    hashtags: ['#BehindTheScenes', '#Creative', '#Process']
  },
  {
    id: 2,
    day: 'Monday',
    time: '6:00 PM',
    content: 'Weekly motivation quote with branded visuals',
    postType: 'Image',
    predictedEngagement: 6200,
    predictedReach: 38000,
    confidence: 88,
    hashtags: ['#Motivation', '#MondayVibes', '#Inspiration']
  },
  {
    id: 3,
    day: 'Wednesday',
    time: '12:00 PM',
    content: 'Product spotlight featuring top customer reviews',
    postType: 'Video',
    predictedEngagement: 12000,
    predictedReach: 65000,
    confidence: 95,
    hashtags: ['#ProductSpotlight', '#CustomerLove', '#Reviews']
  },
  {
    id: 4,
    day: 'Wednesday',
    time: '8:00 PM',
    content: 'Interactive poll: What content do you want to see?',
    postType: 'Poll',
    predictedEngagement: 9500,
    predictedReach: 42000,
    confidence: 90,
    hashtags: ['#Community', '#YourVoice', '#Interactive']
  },
  {
    id: 5,
    day: 'Friday',
    time: '10:00 AM',
    content: 'Weekend plans inspiration and recommendations',
    postType: 'Carousel',
    predictedEngagement: 11000,
    predictedReach: 58000,
    confidence: 93,
    hashtags: ['#WeekendVibes', '#FridayFeeling', '#Inspiration']
  },
  {
    id: 6,
    day: 'Friday',
    time: '7:00 PM',
    content: 'User-generated content showcase and celebration',
    postType: 'Reel',
    predictedEngagement: 15000,
    predictedReach: 72000,
    confidence: 96,
    hashtags: ['#Community', '#UGC', '#Featured']
  },
  {
    id: 7,
    day: 'Sunday',
    time: '11:00 AM',
    content: 'Weekly recap highlights and achievements',
    postType: 'Carousel',
    predictedEngagement: 7800,
    predictedReach: 40000,
    confidence: 87,
    hashtags: ['#WeeklyRecap', '#Highlights', '#SundayFunday']
  }
];

const weeklyEngagementPrediction = [
  { day: 'Mon', predicted: 14700, historical: 12500 },
  { day: 'Tue', predicted: 8500, historical: 8000 },
  { day: 'Wed', predicted: 21500, historical: 19000 },
  { day: 'Thu', predicted: 9000, historical: 8500 },
  { day: 'Fri', predicted: 26000, historical: 23000 },
  { day: 'Sat', predicted: 12000, historical: 11000 },
  { day: 'Sun', predicted: 7800, historical: 7200 },
];

// =================================================================================
// CHART COMPONENTS
// =================================================================================

const FollowersTrendChart: React.FC<{ data: DailyFollowerData[] }> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-md p-4 rounded-xl border border-gray-700/50 shadow-xl">
          <p className="font-semibold text-gray-100 mb-2">{label}</p>
          <p className="text-emerald-400 text-sm">{`New: ${payload[0].value}`}</p>
          <p className="text-rose-400 text-sm">{`Lost: ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorUnfollow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fb7185" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#fb7185" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
        <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{color: '#d1d5db', fontSize: '13px'}} iconType="circle" />
        <Area type="monotone" dataKey="newFollowers" name="New Followers" stroke="#34d399" strokeWidth={2} fill="url(#colorNew)" />
        <Area type="monotone" dataKey="unfollowers" name="Unfollowers" stroke="#fb7185" strokeWidth={2} fill="url(#colorUnfollow)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const GrowthRateChart: React.FC<{ data: GrowthData[] }> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-md p-4 rounded-xl border border-gray-700/50 shadow-xl">
          <p className="font-semibold text-gray-100 mb-1">{label}</p>
          <p className="text-emerald-400 text-sm">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
        <YAxis unit="%" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} fill="url(#colorGrowth)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const LocationChart: React.FC<{ data: LocationData[] }> = ({ data }) => {
    const CustomTooltip = ({ active, payload }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-gray-900/95 backdrop-blur-md p-4 rounded-xl border border-gray-700/50 shadow-xl">
            <p className="font-semibold text-gray-100 mb-1">{payload[0].payload.country}</p>
            <p className="text-blue-400 text-sm">{`${payload[0].value.toLocaleString()} followers`}</p>
          </div>
        );
      }
      return null;
    };
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
          <YAxis type="category" dataKey="country" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} width={60} />
          <Tooltip cursor={{fill: '#1f2937'}} content={<CustomTooltip />} />
          <Bar dataKey="followers" fill="#60a5fa" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

const GenderChart: React.FC<{ data: GenderData[] }> = ({ data }) => {
    const COLORS = ['#a78bfa', '#60a5fa', '#4ade80'];
    const CustomTooltip = ({ active, payload }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-gray-900/95 backdrop-blur-md p-4 rounded-xl border border-gray-700/50 shadow-xl">
            <p className="font-semibold text-gray-100">{`${payload[0].name}: ${payload[0].value}%`}</p>
          </div>
        );
      }
      return null;
    };
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{color: '#d1d5db', fontSize: '13px'}} iconType="circle" />
          <Pie
            data={data as any}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            nameKey="gender"
            label={({ name, percent }) => `${((percent as number) * 100).toFixed(0)}%`}
            stroke="#1f2937"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  };

const AgeGroupChart: React.FC<{ data: AgeData[] }> = ({ data }) => {
    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-gray-900/95 backdrop-blur-md p-4 rounded-xl border border-gray-700/50 shadow-xl">
            <p className="font-semibold text-gray-100 mb-1">{label}</p>
            <p className="text-purple-400 text-sm">{`${payload[0].value}%`}</p>
          </div>
        );
      }
      return null;
    };
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="group" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
          <YAxis unit="%" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
          <Tooltip cursor={{fill: '#1f2937'}} content={<CustomTooltip />} />
          <Bar dataKey="percentage" fill="#a78bfa" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

const EngagementChart: React.FC<{ data: EngagementData[] }> = ({ data }) => {
    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-gray-900/95 backdrop-blur-md p-4 rounded-xl border border-gray-700/50 shadow-xl">
            <p className="font-semibold text-gray-100 mb-2">{label}</p>
            <p className="text-teal-400 text-sm">{`This Week: ${payload[0].value.toLocaleString()}`}</p>
            <p className="text-gray-500 text-sm">{`Last Week: ${payload[1].value.toLocaleString()}`}</p>
          </div>
        );
      }
      return null;
    };
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
          <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
          <Tooltip cursor={{fill: '#1f2937'}} content={<CustomTooltip />} />
          <Legend wrapperStyle={{color: '#d1d5db', fontSize: '13px'}} iconType="circle" />
          <Bar dataKey="value" name="This Week" fill="#14b8a6" radius={[8, 8, 0, 0]} />
          <Bar dataKey="lastWeek" name="Last Week" fill="#4b5563" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

const ReachChart: React.FC<{ data: ReachData[] }> = ({ data }) => {
    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-gray-900/95 backdrop-blur-md p-4 rounded-xl border border-gray-700/50 shadow-xl">
            <p className="font-semibold text-gray-100 mb-1">{label}</p>
            <p className="text-amber-400 text-sm">{`${payload[0].value.toLocaleString()}`}</p>
          </div>
        );
      }
      return null;
    };
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
              <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
              </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
          <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="reach" stroke="#fbbf24" strokeWidth={3} fillOpacity={1} fill="url(#colorReach)" />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

const OnlineUsersChart: React.FC<{ data: OnlineUsersData[] }> = ({ data }) => {
    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-gray-900/95 backdrop-blur-md p-4 rounded-xl border border-gray-700/50 shadow-xl">
            <p className="font-semibold text-gray-100 mb-1">{label}</p>
            <p className="text-cyan-400 text-sm">{`${payload[0].value.toLocaleString()} users`}</p>
          </div>
        );
      }
      return null;
    };
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
          <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
          <Tooltip cursor={{strokeDasharray: '3 3'}} content={<CustomTooltip />} />
          <Line type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

const WeeklyPredictionChart: React.FC<{ data: any[] }> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-md p-4 rounded-xl border border-gray-700/50 shadow-xl">
          <p className="font-semibold text-gray-100 mb-2">{label}</p>
          <p className="text-emerald-400 text-sm">{`Predicted: ${payload[0].value.toLocaleString()}`}</p>
          <p className="text-gray-400 text-sm">{`Historical: ${payload[1].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
        <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
        <Tooltip cursor={{fill: '#1f2937'}} content={<CustomTooltip />} />
        <Legend wrapperStyle={{color: '#d1d5db', fontSize: '13px'}} iconType="circle" />
        <Bar dataKey="predicted" name="Predicted" fill="#34d399" radius={[8, 8, 0, 0]} />
        <Bar dataKey="historical" name="Historical Avg" fill="#4b5563" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

// =================================================================================
// UI COMPONENTS
// =================================================================================

interface MetricCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-2xl hover:border-gray-600/50 transition-all duration-300 min-h-[320px] flex flex-col ${className}`}>
      <h3 className="text-base font-semibold text-gray-200 mb-5 tracking-wide">{title}</h3>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

const PostCard: React.FC<{ post: PredictedPost }> = ({ post }) => {
  const getPostTypeColor = (type: string) => {
    switch(type) {
      case 'Carousel': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Video': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Reel': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Image': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Poll': return 'bg-teal-500/20 text-teal-300 border-teal-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-emerald-400';
    if (confidence >= 80) return 'text-blue-400';
    return 'text-amber-400';
  };

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-lg font-semibold text-white mb-1">{post.day}</h4>
          <p className="text-gray-400 text-sm">{post.time}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPostTypeColor(post.postType)}`}>
          {post.postType}
        </span>
      </div>
      
      <p className="text-gray-300 mb-4 leading-relaxed">{post.content}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {post.hashtags.map((tag, idx) => (
          <span key={idx} className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700/50">
        <div>
          <p className="text-xs text-gray-400 mb-1">Engagement</p>
          <p className="text-lg font-semibold text-emerald-400">{post.predictedEngagement.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Reach</p>
          <p className="text-lg font-semibold text-blue-400">{post.predictedReach.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Confidence</p>
          <p className={`text-lg font-semibold ${getConfidenceColor(post.confidence)}`}>{post.confidence}%</p>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Total Followers */}
        <MetricCard title="Total Followers">
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{totalFollowers.toLocaleString()}</p>
            <div className="mt-4 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <p className="text-sm text-emerald-400 font-medium">↑ 12% this week</p>
            </div>
          </div>
        </MetricCard>

        {/* Followers Trend */}
        <MetricCard title="Followers Trend" className="lg:col-span-2">
          <FollowersTrendChart data={followerTrendData} />
        </MetricCard>

        {/* Growth Rate */}
        <MetricCard title="Growth Rate">
          <GrowthRateChart data={growthRateData} />
        </MetricCard>

        {/* Engagement */}
        <MetricCard title="Engagement" className="md:col-span-2">
          <EngagementChart data={engagementData} />
        </MetricCard>

        {/* Reach */}
        <MetricCard title="Monthly Reach" className="md:col-span-2 lg:col-span-2">
          <ReachChart data={reachData} />
        </MetricCard>

        {/* Gender */}
        <MetricCard title="Audience Gender">
          <GenderChart data={genderData} />
        </MetricCard>

        {/* Age */}
        <MetricCard title="Age Distribution">
          <AgeGroupChart data={ageData} />
        </MetricCard>

         {/* Location */}
         <MetricCard title="Top Locations" className="md:col-span-2">
          <LocationChart data={locationData} />
        </MetricCard>

        {/* Weekly Online */}
        <MetricCard title="Daily Active Users" className="md:col-span-2">
          <OnlineUsersChart data={onlineUsersData} />
        </MetricCard>
      </div>
    );
  };

const PredictedPostsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">AI-Powered Post Predictions</h2>
          <p className="text-gray-400">Optimized posting schedule for maximum engagement</p>
        </div>
        <button 
          onClick={onBack}
          className="bg-gray-700/50 hover:bg-gray-700 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 border border-gray-600/50"
        >
          Back to Analytics
        </button>
      </div>

      {/* Weekly Overview */}
      <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-2xl">
        <h3 className="text-lg font-semibold text-gray-200 mb-5">Weekly Engagement Forecast</h3>
        <div className="h-64">
          <WeeklyPredictionChart data={weeklyEngagementPrediction} />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-6 rounded-2xl border border-emerald-500/20">
          <p className="text-sm text-emerald-300 mb-2">Total Posts</p>
          <p className="text-3xl font-bold text-emerald-400">{predictedPosts.length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-6 rounded-2xl border border-blue-500/20">
          <p className="text-sm text-blue-300 mb-2">Avg Confidence</p>
          <p className="text-3xl font-bold text-blue-400">91%</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-6 rounded-2xl border border-purple-500/20">
          <p className="text-sm text-purple-300 mb-2">Expected Engagement</p>
          <p className="text-3xl font-bold text-purple-400">69.2K</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-6 rounded-2xl border border-amber-500/20">
          <p className="text-sm text-amber-300 mb-2">Expected Reach</p>
          <p className="text-3xl font-bold text-amber-400">360K</p>
        </div>
      </div>

      {/* Predicted Posts */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-6">Recommended Posts This Week</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {predictedPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/5 p-6 rounded-2xl border border-cyan-500/20">
        <h4 className="text-lg font-semibold text-cyan-300 mb-3">💡 Pro Tips</h4>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-cyan-400 mr-2">•</span>
            <span>Posts scheduled for Friday evening show the highest engagement potential</span>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-2">•</span>
            <span>Video and Reel content is predicted to perform 40% better than static images</span>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-2">•</span>
            <span>Interactive content (polls, questions) increases engagement by 35%</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

// =================================================================================
// MAIN APP COMPONENT
// =================================================================================
const App: React.FC = () => {
  const [showPredictions, setShowPredictions] = useState(false);

  return (
    <div className=" bg-bg-primary from-gray-900 via-gray-900 to-gray-800 min-h-screen text-gray-300 font-sans">
      <main className="px-6 py-10 sm:px-8 lg:px-12 max-w-[1800px] mx-auto">
        {!showPredictions ? (
          <>
            <div className="mb-10 flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Analytics Dashboard</h1>
                <p className="text-gray-400 text-sm">Monitor your social media performance</p>
              </div>
              <button 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowPredictions(true)}
              >
                Predict Posts
              </button>
            </div>
            <Dashboard />
          </>
        ) : (
          <PredictedPostsView onBack={() => setShowPredictions(false)} />
        )}
      </main>
    </div>
  );
};

export default App;