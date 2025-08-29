import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaTimes, FaCommentDots } from 'react-icons/fa';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    // Simulate a bot response
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: 'This is a bot response.', sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className={`chat-widget-container ${isOpen ? 'open' : ''}`}>
      <div className="chat-widget-button" onClick={toggleWidget}>
        {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={24} />}
      </div>
      {isOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <h3>Chat with us</h3>
          </div>
          <div className="chat-body" ref={chatContainerRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
