import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Only GET requests are allowed' });
    }

    try {
        const newsTrends = await getNewsTrends();

        return res.status(200).json({ newsTrends });
    } catch (error) {
        console.error('Error fetching trends:', error);
        return res.status(500).json({ error: 'Failed to fetch trends' });
    }
}

// Fetch News Trends
async function getNewsTrends() {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                category: 'technology',
                language: 'en',
                apiKey: process.env.NEWS_API_KEY,
            },
        });

        return response.data.articles.map(article => ({
            title: article.title,
            url: article.url
        }));
    } catch (error) {
        console.error('Error fetching news trends:', error);
        // Updated fallback data to include URLs
        return [
            {
                title: 'Tech Stocks Rising',
                url: 'https://example.com/tech-stocks'
            },
            {
                title: 'AI Breakthroughs',
                url: 'https://example.com/ai-breakthroughs'
            },
            {
                title: 'Cybersecurity Trends',
                url: 'https://example.com/cybersecurity'
            }
        ];
    }
}