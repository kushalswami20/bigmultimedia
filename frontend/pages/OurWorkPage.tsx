import React, { useState } from 'react';
import { Project } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';

const allProjects: Project[] = [
    { id: 1, category: 'Design', title: 'Fintech App Concept', imageUrl: 'https://i.ibb.co/3zdWfP5/work-1.png' },
    { id: 2, category: 'Web Designs', title: 'E-commerce Platform', imageUrl: 'https://i.ibb.co/v4S6d1r/work-2.png' },
    { id: 3, category: 'Social Media', title: 'Audience Plus Branding', imageUrl: 'https://i.ibb.co/2d1hS1r/work-3.png' },
    { id: 4, category: 'Design', title: 'Crypto Wallet UI', imageUrl: 'https://i.ibb.co/6Zz3sLw/phone-mockup.png' },
    { id: 5, category: 'Print Work', title: 'Corporate Brochure', imageUrl: 'https://i.ibb.co/L5BKnQd/work-4.png' },
    { id: 6, category: 'Web Designs', title: 'SaaS Dashboard', imageUrl: 'https://i.ibb.co/f2c1gTf/work-5.png' },
    { id: 7, category: 'Social Media', title: 'Campaign Graphics', imageUrl: 'https://i.ibb.co/N1jTqQz/work-6.png' },
    { id: 8, category: 'Design', title: 'Mobile Banking App', imageUrl: 'https://i.ibb.co/FzH08jV/work-7.png' },
    { id: 9, category: 'Web Designs', title: 'Portfolio Website', imageUrl: 'https://i.ibb.co/2KvJk0M/work-8.png' },
];

const OurWorkPage: React.FC = () => {
    const [filter, setFilter] = useState('All');
    const filters = ['All', 'Design', 'Print Work', 'Social Media', 'Web Designs'];

    const filteredProjects = filter === 'All' ? allProjects : allProjects.filter(p => p.category === filter);
    
    // Define column spans for a mosaic layout. This is a simplified example.
    const itemClasses = [
        'md:col-span-2', 'md:col-span-1', 'md:col-span-1',
        'md:col-span-1', 'md:col-span-2', 'md:col-span-1',
        'md:col-span-1', 'md:col-span-1', 'md:col-span-2'
    ];

    return (
        <div className="bg-bg-primary min-h-screen text-text-primary">
            <Header />
            <main className="pt-6 md:pt-20 px-2 md:px-4 lg:px-6">
                <section className="py-16">
                    <h1 className="font-inter font-medium md:text-7xl font-extrabold text-center mb-8">Our Work</h1>
                    <div className="flex justify-center flex-wrap gap-4 mb-12">
                        {filters.map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-5 py-2 text-sm font-regular rounded-full transition-colors ${filter === f ? 'bg-gradient-to-r from-brand-purple to-brand-blue text-white' : 'bg-bg-surface text-text-secondary hover:bg-gray-700'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {filteredProjects.map((project, index) => (
                            <div key={project.id} className={`group relative overflow-hidden rounded-2xl cursor-pointer ${itemClasses[index % itemClasses.length]} aspect-[4/3]`}>
                                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div>
                                        <h3 className="font-regular font-bold">{project.title}</h3>
                                        <p className="text-sm text-text-secondary">{project.category}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default OurWorkPage;