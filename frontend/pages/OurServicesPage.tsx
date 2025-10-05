import React from 'react';
import { Service } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';

const services: Service[] = [
    { title: 'Digital Strategy & Planning', description: 'A successful startup needs more than just marketing—it needs a strategy.' },
    { title: 'Creative Strategy & Web Graphics Design', description: 'A successful startup needs more than just marketing—it needs a strategy.' },
    { title: 'Social Media Marketing', description: 'A successful startup needs more than just marketing—it needs a strategy.' },
    { title: 'Web Design and Development', description: 'A successful startup needs more than just marketing—it needs a strategy.' },
    { title: 'Email Marketing', description: 'A successful startup needs more than just marketing—it needs a strategy.' },
    { title: 'Media Planning and Buying', description: 'A successful startup needs more than just marketing—it needs a strategy.' },
];

const OurServicesPage: React.FC = () => {
    return (
        <div className="bg-bg-primary min-h-screen text-text-primary">
            <Header />
            <main className="pt-20">
                <section className="relative min-h-screen flex items-center">
                    <div className="container ">
                        <div className="flex flex-col lg:flex-row items-center">
                            <div className="relative lg:w-1/4 flex justify-center items-center py-16 lg:py-0">
                                <h1 className="text-8xl font-extrabold lg:transform lg:-rotate-90 lg:whitespace-nowrap">Our Services</h1>
                            </div>
                            <div className="lg:w-3/4 grid sm:grid-cols-2 gap-8">
                                {services.map((service, index) => (
                                    <div key={index} className="p-8 border border-border-color rounded-2xl bg-bg-surface backdrop-blur-sm hover:border-brand-blue transition-colors duration-300">
                                        <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                                        <p className="text-text-secondary mb-6">{service.description}</p>
                                        <button className="font-semibold text-brand-green hover:text-white">Read More &rarr;</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default OurServicesPage;