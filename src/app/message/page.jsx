// Message.jsx
"use client";
import React, { useEffect, useState } from 'react';
import useChat from '../../hooks/useChat';
import MainLayout from '../../components/core/layouts/MainLayout';

const Message = () => {
  const { messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      sendMessage({
        sender:  localStorage.getItem('userId'),
        content: newMessage,
        receiver : '8881d567-76bc-4163-903d-864f7ed0fd61', 
      });
      setNewMessage('');
    }
  };

  return (
    <MainLayout>
      <div>
        <h2>Chat Room</h2>
        <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
          {messages.map((message, index) => (
            <div key={index}>{`${message.sender}: ${message.content}`}</div>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </MainLayout>
  );
};

export default Message;
