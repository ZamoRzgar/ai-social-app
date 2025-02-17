'use client';

import { useState, useEffect } from 'react';
import './trends.css';

interface Trend {
    title: string;
    url: string;
}

const TrendsPage = () => {
    const [newsTrends, setNewsTrends] = useState<Trend[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                const response = await fetch('/api/trends');
                const data = await response.json();

                if (response.ok) {
                    // Assuming the API now returns an array of Trend objects
                    // If not, you'll need to modify the API response
                    setNewsTrends(data.newsTrends);
                } else {
                    setError(data.error || 'Failed to load trends');
                }
            } catch (error) {
                setError('Error fetching trends');
            } finally {
                setLoading(false);
            }
        };

        fetchTrends();
    }, []);

    const handleTrendClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="trends-container">
            <h1 className="title">🔥 AI-Powered Trends Finder</h1>
            {loading && <p className="loading">Loading trends...</p>}
            {error && <p className="error">{error}</p>}

            <div className="trends-section">
                <h2 className="section-title">News Trends</h2>
                <ul className="trends-list">
                    {newsTrends.map((trend, index) => (
                        <li
                            key={index}
                            className="trend-item"
                            onClick={() => handleTrendClick(trend.url)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleTrendClick(trend.url);
                                }
                            }}
                        >
                            <span className="trend-title">{trend.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TrendsPage;