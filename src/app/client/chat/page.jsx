'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Bot } from 'lucide-react';

// Mock initial messages for demonstration purposes
const initialMessages = [
  {
    id: 1,
    sender: 'ai',
    text: "Hello. I'm MindfulAI, your personal companion. Take a deep breath. How are you feeling today?",
    timestamp: '9:00 AM',
  },
];

const ClientChatPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

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
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');

    // Mock AI response after a short delay to simulate processing
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        text: "Thank you for sharing that. Could you tell me a bit more about what's on your mind?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const handleMicClick = () => {
    setIsRecording(prev => !prev);
    // In a real app, you would start/stop audio recording and transcription here.
    console.log(isRecording ? "Stopping recording" : "Starting recording");
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 bg-[url('/grid.svg')]">
      {/* Chat Messages Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`flex items-end gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Bot size={20} />
                </div>
              )}
              <div
                className={`max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-md ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
              >
                <p className="leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                  {message.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </main>
      {/* Input Form */}
      <footer className="bg-white border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
          <motion.button
            type="button"
            onClick={handleMicClick}
            className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors"
            animate={isRecording ? { scale: [1, 1.2, 1], transition: { duration: 1, repeat: Infinity } } : {}}
          >
            <Mic size={24} className={isRecording ? 'text-red-500' : 'text-gray-500'} />
          </motion.button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isRecording ? "Listening..." : "Type your message here..."}
            className="flex-1 w-full px-4 py-2 bg-white text-gray-900 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ClientChatPage;
