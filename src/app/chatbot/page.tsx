"use client";
import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import './Chatbot.css';

const ChatbotPage: React.FC = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);

        setInput("");

        try {
            const response = await fetch("/api/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            const botMessage = { role: "bot", content: data.response };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="chatbot-page min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                <FaRobot className="mr-2" /> AI Chatbot
            </h1>

            <div className="chatbox w-full max-w-2xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4">
                <div className="messages h-96 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.role === "user" ? "text-right" : "text-left"} mb-2`}>
                            <span className={`inline-block px-4 py-2 rounded-md ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"}`}>
                                {msg.content}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="input-box w-full max-w-2xl flex">
                <input
                    type="text"
                    className="flex-1 p-3 border rounded-l-md dark:bg-gray-700 dark:text-white"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button className="bg-blue-600 text-white px-4 py-3 rounded-r-md hover:bg-blue-700" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatbotPage;
