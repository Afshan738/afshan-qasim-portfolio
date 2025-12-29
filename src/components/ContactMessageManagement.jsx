import React, { useState, useEffect } from 'react';
import '../App.css';
import { API_URL } from '../config';
function ContactMessageManagement() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState(''); 

  const fetchMessages = async () => {
    setIsLoading(true);
    setError('');
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setError("You must be logged in to view messages.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${ API_URL }/api/contactmessages`, {
        headers: {
          'Authorization': `Afshan ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages. Your session may have expired.');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message permanently?")) {
      return;
    }
    
    setFeedback('');
    const token = localStorage.getItem('adminToken');
    if (!token) return setFeedback("Error: You are not logged in.");

    try {
      const response = await fetch(`${ API_URL }/api/contactmessages/${messageId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Afshan ${token}` }, 
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete message');
      
      setFeedback(data.msg || "Message deleted successfully.");
      fetchMessages(); 
    } catch (err) {
      setFeedback(`Error: ${err.message}`);
    }
  };


  if (isLoading) {
    return <p>Loading messages...</p>;
  }

  if (error) {
    return <p style={{ color: 'var(--color-error)' }}>{error}</p>;
  }

  return (
    <div>
      <h2 className="title">Contact Messages</h2>
      
    
      {feedback && <p>{feedback}</p>}

      <div style={{ width: '100%' }}>
        {messages.length === 0 ? (
          <p>No new messages found.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div className="contact-message-content">
                <p className="sender-info">
                  <strong>From:</strong> {msg.senderName} ({msg.senderEmail})
                </p>
                <p className="message-body">
                  "{msg.messageBody}"
                </p>
                <small className="received-info">
                  Received at: {new Date(msg.receivedAt).toLocaleString()}
                </small>
              </div>
              <div className="list-item-buttons" style={{ marginTop: '1rem', width: '100%' }}>
                <button className="delete-button" onClick={() => handleDelete(msg._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ContactMessageManagement;