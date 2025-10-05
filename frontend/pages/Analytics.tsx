import React from 'react';
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

// =================================================================================
// MAIN APP COMPONENT
// =================================================================================
const App: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 min-h-screen text-gray-300 font-sans">
      <main className="px-6 py-10 sm:px-8 lg:px-12 max-w-[1800px] mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Analytics Dashboard</h1>
          <p className="text-gray-400 text-sm">Monitor your social media performance</p>
        </div>
        <Dashboard />
      </main>
    </div>
  );
};

export default App;