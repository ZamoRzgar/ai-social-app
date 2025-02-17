// Folder: pages/generator/index.js

import React, { useState } from 'react';
import axios from 'axios';

export default function PostGenerator() {
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/generate', { prompt });
      setResponse(res.data.text);
    } catch (error) {
      console.error('Error generating content:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Post Generator</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
          rows="3"
          placeholder="Enter your content idea or topic..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Platform</label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        >
          <option value="Instagram">Instagram</option>
          <option value="Twitter">Twitter</option>
          <option value="Facebook">Facebook</option>
        </select>
      </div>

      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {loading ? 'Generating...' : 'Generate Post'}
      </button>

      {response && (
        <div className="mt-6 p-4 border rounded-md bg-gray-100">
          <h2 className="text-lg font-semibold mb-2">Generated Post:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
