"use client";
import React from 'react';

const Hero = () => {
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-0"></div>

            <div className="container mx-auto max-w-4xl relative z-10 text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                    Transform Your Business
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 block mt-2">
                        with AI
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Unlock the power of AI for generating content, trends, and insights.
                </p>

                <div className="flex gap-4 justify-center">
                    <a
                        href="#features"
                        onClick={(e) => scrollToSection(e, 'features')}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full 
                        transition-all duration-300 ease-in-out transform hover:-translate-y-1 
                        hover:shadow-lg hover:shadow-blue-500/25 font-medium"
                    >
                        Get Started Now
                    </a>

                    <a
                        href="#learn-more"
                        onClick={(e) => scrollToSection(e, 'learn-more')}
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full 
                        transition-all duration-300 backdrop-blur-sm border border-white/10
                        hover:border-white/20 ease-in-out transform hover:-translate-y-1"
                    >
                        Learn More
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;