import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { DashboardIcon, ContentPlanIcon, CompareIcon, LogoutIcon ,AnalyticsIcon} from './icons';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
        { name: 'Analytics', path: '/analytics', icon: AnalyticsIcon },
        { name: 'Content Plan', path: '/planner', icon: ContentPlanIcon },
        { name: 'Compare', path: '/compare', icon: CompareIcon },

    ];
    
    const baseClasses = "flex items-center px-4 py-3 rounded-lg transition-colors duration-200 font-semibold";
    const activeClasses = "bg-brand-blue text-white";
    const inactiveClasses = "text-text-secondary hover:bg-bg-surface hover:text-text-primary";

    return (
        <aside className="w-64 bg-bg-primary p-6 flex-flex-col justify-between border-r border-border-color">
            <div>
                <div className="mb-10">
                     <h1 onClick={() => navigate('/')} className="text-2xl font-bold tracking-wider text-text-primary cursor-pointer">
                        thirdweb.studio
                     </h1>
                </div>
                <nav className="space-y-4">
                    {navItems.map(item => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                        >
                            <item.icon className="h-5 w-5 mr-3" />
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className="mt-auto">
                 <button onClick={() => navigate('/')} className={`${baseClasses} ${inactiveClasses} w-full`}>
                    <LogoutIcon className="h-5 w-5 mr-3" />
                    <span>Back to Home</span>
                 </button>
            </div>
        </aside>
    );
};

export default Sidebar;