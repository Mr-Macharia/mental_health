'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic } from 'lucide-react';

// Mock initial messages for demonstration purposes
const initialMessages = [
  {
    id: 1,
    sender: 'ai',
    text: "Hello. I'm MindfulAI, your personal companion. Take a deep breath. How are you feeling today?",
  },
];

const ClientInteractionPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newUserMessage = {
      id: Date.now(),
      sender: 'user',
      text: input,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');

    // Mock AI response after a short delay to simulate processing
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        text: "Thank you for sharing that. Could you tell me a bit more about what's on your mind?",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 border-b z-10">
        <h1 className="text-xl font-semibold text-gray-800 text-center">Your Conversation</h1>
      </header>

      {/* Chat Messages Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
              >
                <p className="leading-relaxed">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </main>

      {/* Input Form */}
      <footer className="bg-white border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
          <button type="button" className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors">
            <Mic size={24} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 w-full px-4 py-2 bg-gray-100 rounded-full border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          <button type="submit" className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-blue-300 transition-colors">
            <Send size={20} />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ClientInteractionPage;