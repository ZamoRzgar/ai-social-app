import dbConnect from '../../lib/mongodb';
import Chat from '../../models/chat';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { message } = req.body;

        // Validate the message
        if (!message || message.trim() === '') {
            return res.status(400).json({ error: 'Message is required' });
        }

        try {
            // Connect to MongoDB
            await dbConnect();

            // Call OpenRouter API
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`, // Use OpenRouter API key
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo', // Use a valid model ID
                    messages: [
                        { role: 'user', content: message }
                    ],
                    max_tokens: 150,
                    temperature: 0.7,
                }),
            });

            const data = await response.json();
            console.log('Response data:', data); // Log the response data

            const botResponse = data.choices && data.choices[0]?.message?.content
                ? data.choices[0].message.content.trim()
                : 'No response';

            // Save the chat to the database
            await Chat.create({
                userMessage: message,
                botMessage: botResponse,
            });

            // Respond with the AI's reply
            return res.status(200).json({ response: botResponse });
        } catch (error) {
            console.error('Error processing chat:', error);
            return res.status(500).json({ error: 'Failed to process the message' });
        }
    } else {
        return res.status(405).json({ error: 'Only POST requests are allowed' });
    }
}