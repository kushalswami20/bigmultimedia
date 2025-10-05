import React, { useState } from 'react';

const PlannerPage: React.FC = () => {
    const [view, setView] = useState('Month');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Mock days for a month view
    const daysInMonth = Array.from({ length: 35 }, (_, i) => {
        const day = i - 3;
        if (day > 0 && day <= 31) {
            return {
                day: day,
                isCurrentMonth: true,
                content: Math.random() > 0.7 ? { type: 'Reel', title: 'New Product Teaser' } : null
            };
        }
        return { day: 0, isCurrentMonth: false, content: null };
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Content Plan</h1>
                <div className="flex space-x-2 bg-bg-primary p-1 rounded-lg">
                    <button onClick={() => setView('Week')} className={`px-4 py-1 rounded-md text-sm font-semibold ${view === 'Week' ? 'bg-brand-blue text-white' : 'text-text-secondary'}`}>Week</button>
                    <button onClick={() => setView('Month')} className={`px-4 py-1 rounded-md text-sm font-semibold ${view === 'Month' ? 'bg-brand-blue text-white' : 'text-text-secondary'}`}>Month</button>
                </div>
            </div>

            <div className="bg-bg-primary border border-border-color rounded-xl p-4">
                <div className="grid grid-cols-7 text-center font-semibold text-text-secondary mb-2">
                    {daysOfWeek.map(day => <div key={day} className="py-2">{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {daysInMonth.map((day, index) => (
                        <div key={index} className={`h-32 rounded-lg p-2 border border-transparent hover:border-brand-blue cursor-pointer transition-colors ${day.isCurrentMonth ? 'bg-bg-surface' : 'bg-bg-surface/30'}`}>
                            {day.isCurrentMonth && (
                                <>
                                    <span className="font-bold text-text-primary">{day.day}</span>
                                    {day.content && (
                                        <div className="mt-2 text-xs bg-brand-purple/50 p-2 rounded">
                                            <p className="font-semibold">{day.content.type}</p>
                                            <p className="truncate">{day.content.title}</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlannerPage;