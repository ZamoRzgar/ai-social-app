# AI Social Media Assistant

An AI-powered web application that includes an AI chatbot, trends finder, and post generator. This app allows users to:
- **Chat with an AI-powered chatbot** for customer engagement.
- **Find trending topics** and content ideas based on real-time data.
- **Generate social media posts** based on topics using AI.

## Features
- **AI Chatbot**: Automate responses and engage users in conversations.
- **Trends Finder**: Discover trending topics in various fields (e.g., tech, business, etc.).
- **Post Generator**: Generate engaging social media posts based on topics.
- **Contact Form**: Allows users to send messages via email (Nodemailer integration).
- **Dark Mode / Light Mode Toggle**: A simple toggle for changing themes.
  
## Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **Backend**: API Routes in Next.js, OpenRouter API (or OpenAI)
- **Email**: Nodemailer for email sending
- **Database**: Only MongoDB used for AI Chatbot
  
## Installation
### Prerequisites
- Node.js >= 16
- NPM or Yarn

### To Get Started:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-social-media-assistant.git
   cd ai-social-media-assistant

   

2. Install Dependencies:
npm install

3. Set up your environment variables:

Create a .env.local file in the root directory and add your API keys:

    
OPENROUTER_API_KEY=your-openrouter-api-key
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
Run the application:

4.Run the application
npm run dev

5. Visit http://localhost:3000 in your browser to view the application.

Usage
AI Chatbot: Navigate to the chatbot page to interact with the AI.
Trends Finder: Click on "Trends Finder" in the navigation bar to explore trending topics.
Post Generator: Visit the Post Generator page to generate social media posts based on your topic.
Contributing
We welcome contributions! If you'd like to contribute to this project:

Fork this repository.
Create a new branch for your feature or bug fix.
Submit a pull request.
Please ensure that you:

Follow the existing code style.
Write tests for any new functionality.

License
This project is licensed under the Creative Commons Non-Commercial Use License, which allows anyone to use, modify, and distribute the code for non-commercial purposes but prohibits publishing or profiting from the application.

If you have any questions or suggestions, feel free to reach out.



