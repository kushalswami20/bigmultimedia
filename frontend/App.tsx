
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OurWorkPage from './pages/OurWorkPage';
import OurServicesPage from './pages/OurServicesPage';
import DashboardPage from './pages/DashboardPage';
import PlannerPage from './pages/PlannerPage';
import ComparePage from './pages/ComparePage';
import DashboardLayout from './components/DashboardLayout';
import Analytics from './pages/Analytics';

const App: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/our-work" element={<OurWorkPage />} />
                <Route path="/our-services" element={<OurServicesPage />} />
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/analytics" element={<Analytics/>} />
                    <Route path="/planner" element={<PlannerPage />} />
                    <Route path="/compare" element={<ComparePage />} />

                </Route>
            </Routes>
        </HashRouter>
    );
};

export default App;
