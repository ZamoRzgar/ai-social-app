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
            // Connect to MongoDB - await the connection to ensure it's ready
            await dbConnect();

            let botResponse;

            try {
                // Call OpenRouter API
                const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [
                            { role: 'user', content: message }
                        ],
                        max_tokens: 150,
                        temperature: 0.7,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`API responded with status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Response data:', JSON.stringify(data, null, 2));

                // Check the actual structure 
                if (data.choices && data.choices.length > 0) {
                    console.log('Message object:', JSON.stringify(data.choices[0].message, null, 2));
                }

                botResponse = data.choices && data.choices[0]?.message?.content
                    ? data.choices[0].message.content.trim()
                    : 'No response';

            } catch (apiError) {
                console.error('Error calling AI API:', apiError);
                botResponse = 'Sorry, I encountered an error processing your request.';
            }

            // Save the chat to the database
            try {
                const chatEntry = await Chat.create({
                    userMessage: message,
                    botMessage: botResponse,
                });

                console.log('Chat saved to database with ID:', chatEntry._id);
            } catch (dbError) {
                console.error('Error saving to database:', dbError);
                // Continue with the response even if DB save fails
            }

            // Respond with the AI's reply
            return res.status(200).json({ response: botResponse });
        } catch (error) {
            console.error('Error processing chat:', error);
            return res.status(500).json({ error: 'Failed to process the message' });
        }
    } else if (req.method === 'GET') {
        // Add GET endpoint to retrieve recent chats
        try {
            await dbConnect();
            const chats = await Chat.find().sort({ createdAt: -1 }).limit(10);
            return res.status(200).json({ chats });
        } catch (error) {
            console.error('Error fetching chats:', error);
            return res.status(500).json({ error: 'Failed to fetch chats' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}