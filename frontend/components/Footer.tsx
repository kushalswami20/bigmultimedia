import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white py-16 relative overflow-hidden">
            {/* Background pure color circles */}
            <div className="absolute inset-0">
                {/* Large green circle on the bottom left */}
                <div 
                    className="absolute -bottom-80 left-80 w-[500px] h-[500px] rounded-full"
                    style={{ backgroundColor: '#3EFFB4' }}
                ></div>
                
                {/* Blue circle in the top right area */}
                <div 
                    className="absolute -top-32 right-90 w-[400px] h-[400px] rounded-full"
                    style={{ backgroundColor: '#53A0FD' }}
                ></div>
                
                {/* Purple circle on the bottom right */}
                <div 
                    className="absolute -bottom-32 right-0 w-[450px] h-[450px] rounded-full"
                    style={{ backgroundColor: '#3023AE' }}
                ></div>
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-3 gap-12 items-start">
                    
                    {/* Left section */}
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold">A.I product studio</h2>
                        <p className="text-gray-300 text-lg max-w-md">
                            Feel free to reach out if you want to collaborate with us, or simply have a chat.
                        </p>
                        <div className="pt-4">
                            <a 
                                href="mailto:hello@bigmediamarketing.studio" 
                                className="text-xl text-white hover:text-gray-300 transition-colors"
                            >
                                hello@bigmediamarketing.studio
                            </a>
                        </div>
                    </div>
                    
                    {/* Middle section - Our projects */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white">Our projects</h3>
                        <nav className="flex flex-col space-y-3">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">WingRiders</a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">Trackee</a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">Worldcoin</a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">Audience+</a>
                        </nav>
                    </div>
                    
                    {/* Right section - Follow us */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white">Follow us</h3>
                        <nav className="flex flex-col space-y-3">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">Facebook</a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">Instagram</a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">Dribbble</a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">Linkedin</a>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;