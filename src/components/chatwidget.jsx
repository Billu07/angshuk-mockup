import React, { useState } from 'react';
import { motion } from 'framer-motion';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Thanks for your message! We’ll get back soon.' },
      ]);
    }, 500);
    setInput('');
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-20 right-4 bg-soft-teal text-off-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="fas fa-comment text-xl"></i>
      </motion.div>

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          className="fixed bottom-20 right-4 w-80 bg-off-white rounded-lg shadow-xl flex flex-col z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="bg-soft-teal text-off-white p-3 rounded-t-lg flex justify-between items-center">
            <span>Live Chat</span>
            <button onClick={() => setIsOpen(false)} className="text-off-white">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="flex-1 p-4 bg-light-gray overflow-y-auto max-h-64">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg max-w-[75%] ${
                  msg.sender === 'user'
                    ? 'bg-soft-teal text-off-white ml-auto'
                    : 'bg-white text-deep-charcoal'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-soft-teal outline-none"
            />
          </div>
        </motion.div>
      )}
    </>
  );
}

export default ChatWidget;