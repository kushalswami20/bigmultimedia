import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuIcon } from './icons';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Our Work', path: '/our-work' },
        { name: 'Our Services', path: '/our-services' },
        { name: 'Dashboard', path: '/dashboard' },
    ];

    const linkClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
    const activeLinkClasses = "bg-bg-surface text-text-primary";
    const inactiveLinkClasses = "text-text-secondary hover:text-text-primary hover:bg-white/5";

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/50 backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo on the left */}
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="text-xl font-bold tracking-wider">
                            thirdweb.studio
                        </NavLink>
                    </div>
                    
                    {/* Centered navigation for desktop */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
                        <div className="flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    
                    {/* Mobile menu button on the right */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-surface focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-normal font-inter ${isActive ? 'bg-bg-surface text-text-primary' : 'text-text-secondary hover:bg-bg-surface hover:text-text-primary'}`}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;