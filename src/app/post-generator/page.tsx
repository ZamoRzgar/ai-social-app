'use client';

import React, { useState, useEffect } from 'react';
import './post-generator.css';

const AIAccents = () => {
    return (
        <>
            <div className="ai-accent"></div>
            <div className="ai-accent"></div>
            <div className="circuit-lines">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="circuit-line" style={{ animationDelay: `${i * 0.2}s` }}></div>
                ))}
            </div>
        </>
    );
};

const PostGenerator = () => {
    const [topic, setTopic] = useState('');
    const [generatedPost, setGeneratedPost] = useState('');
    const [loading, setLoading] = useState(false);
    const [displayedPost, setDisplayedPost] = useState('');

    const handleGeneratePost = async () => {
        if (!topic.trim()) return;

        setLoading(true);
        setGeneratedPost('');
        setDisplayedPost('');

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic }),
            });

            const data = await response.json();
            setGeneratedPost(data.generatedPost);
        } catch (error) {
            console.error('Error generating post:', error);
            setGeneratedPost('Failed to generate post. Try again.');
        }

        setLoading(false);
    };

    useEffect(() => {
        if (generatedPost) {
            let index = 0;
            const words = generatedPost.split(' ');
            const interval = setInterval(() => {
                setDisplayedPost((prev) => prev + (index > 0 ? ' ' : '') + words[index]);
                index++;
                if (index === words.length) clearInterval(interval);
            }, 200);
            return () => clearInterval(interval);
        }
    }, [generatedPost]);

    return (
        <div className="post-generator-container">
            <AIAccents />

            <div className="content-wrapper">
                <h1 className="title">
                    AI-Powered Post Generator
                    <span className="title-accent"></span>
                </h1>

                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Enter a topic..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="input"
                    />
                    <div className="input-glow"></div>
                </div>

                <button
                    onClick={handleGeneratePost}
                    disabled={loading}
                    className={`button ${loading ? 'generating' : ''}`}
                >
                    <span className="button-text">
                        {loading ? 'Generating...' : 'Generate Post'}
                    </span>
                    <div className="button-glow"></div>
                </button>

                {displayedPost && (
                    <div className="generated-post">
                        <div className="post-header">
                            <h2>Generated Post</h2>
                            <div className="ai-indicator">
                                <div className="ai-dot"></div>
                                AI Generated
                            </div>
                        </div>
                        <p>{displayedPost}</p>
                        <div className="post-glow"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostGenerator;