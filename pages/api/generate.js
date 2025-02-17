export default async function handler(req, res) {
  if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { topic } = req.body;

  if (!topic || topic.trim() === '') {
      return res.status(400).json({ error: 'Topic is required' });
  }

  try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`, // Use OpenRouter API key
          },
          body: JSON.stringify({
              model: 'gpt-3.5-turbo', // Use a valid model ID
              messages: [
                  { role: 'system', content: 'You are a social media expert creating engaging posts.' },
                  { role: 'user', content: `Generate a social media post about: ${topic}` }
              ],
              max_tokens: 150,
              temperature: 0.7,
          }),
      });

      const data = await response.json();
      console.log('Response data:', data); // Log the response data

      const generatedPost = data.choices?.[0]?.message?.content?.trim() || 'No post generated.';

      res.status(200).json({ generatedPost });
  } catch (error) {
      console.error('Error generating post:', error);
      res.status(500).json({ error: 'Failed to generate post' });
  }
}