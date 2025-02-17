import React from 'react';
import Link from 'next/link';
import { FaRobot, FaChartLine, FaClipboardList } from 'react-icons/fa';

const FeaturesSection = () => {
    return (
        <section id="features" className="relative py-24 px-4 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-0"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                        Features
                    </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* AI Chatbot */}
                    <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 
                                  transition-all duration-300 hover:bg-white/10 hover:border-white/20 
                                  hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10">
                        <div className="flex items-center justify-center w-16 h-16 mb-8 rounded-full 
                                      bg-blue-600/20 text-blue-500 group-hover:text-blue-400 
                                      transition-colors duration-300">
                            <FaRobot className="w-8 h-8" />
                        </div>

                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">
                            AI Chatbot
                        </h3>

                        <p className="text-gray-400 mb-8 text-base leading-relaxed">
                            Automate responses and engage customers with intelligent conversations.
                        </p>

                        <Link href="/chatbot" className="inline-block w-full">
                            <button className="w-full px-6 py-3 text-sm font-medium text-white 
                                           bg-blue-600 rounded-full transition-all duration-300 
                                           hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25">
                                Try It Now
                            </button>
                        </Link>
                    </div>

                    {/* Trends Finder */}
                    <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 
                                  transition-all duration-300 hover:bg-white/10 hover:border-white/20 
                                  hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10">
                        <div className="flex items-center justify-center w-16 h-16 mb-8 rounded-full 
                                      bg-blue-600/20 text-blue-500 group-hover:text-blue-400 
                                      transition-colors duration-300">
                            <FaChartLine className="w-8 h-8" />
                        </div>

                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">
                            Trends Finder
                        </h3>

                        <p className="text-gray-400 mb-8 text-base leading-relaxed">
                            Discover trending topics and content ideas to stay ahead of the competition.
                        </p>

                        <Link href="/trends" className="inline-block w-full">
                            <button className="w-full px-6 py-3 text-sm font-medium text-white 
                                           bg-blue-600 rounded-full transition-all duration-300 
                                           hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25">
                                Try It Now
                            </button>
                        </Link>
                    </div>

                    {/* Post Generator */}
                    <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 
                                  transition-all duration-300 hover:bg-white/10 hover:border-white/20 
                                  hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10">
                        <div className="flex items-center justify-center w-16 h-16 mb-8 rounded-full 
                                      bg-blue-600/20 text-blue-500 group-hover:text-blue-400 
                                      transition-colors duration-300">
                            <FaClipboardList className="w-8 h-8" />
                        </div>

                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">
                            Post Generator
                        </h3>

                        <p className="text-gray-400 mb-8 text-base leading-relaxed">
                            Quickly generate engaging social media posts powered by AI.
                        </p>

                        <Link href="/post-generator" className="inline-block w-full">
                            <button className="w-full px-6 py-3 text-sm font-medium text-white 
                                           bg-blue-600 rounded-full transition-all duration-300 
                                           hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25">
                                Try It Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;