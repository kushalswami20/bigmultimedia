import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-bg-primary text-text-primary flex">
            <Sidebar />
            <main className="flex-1 p-4 sm:p-6 lg:p-10 bg-bg-surface">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;