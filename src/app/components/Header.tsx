"use client";
import React from 'react';

const Header = () => {
    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl z-50">
            <div className="w-full bg-black/70 backdrop-blur-md rounded-full border border-white/10 px-6 py-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold text-white">
                        AI Social Tools
                    </h1>

                    <nav className="flex items-center gap-8">
                        <a
                            href="#home"
                            className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
                        >
                            Home
                        </a>
                        <a
                            href="#features"
                            className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
                        >
                            Features
                        </a>
                        <a
                            href="#contact"
                            className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
                        >
                            Contact
                        </a>

                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;