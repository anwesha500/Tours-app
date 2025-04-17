import React, { useState } from 'react';
import axios from 'axios';
import '../css/ChatbotModal.css';

function ChatbotModal({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm your AI Buddy. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await axios.post('http://localhost:3000/api/chat', {
        userMessage: input
      });

      setMessages(prev => [...prev, { sender: 'bot', text: res.data.reply }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Something went wrong!' }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chatbot-modal">
      <div className="chatbot-content">
        <div className="chatbot-header">
          <span>AI Buddy 🤖</span>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="chatbot-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatbotModal;
