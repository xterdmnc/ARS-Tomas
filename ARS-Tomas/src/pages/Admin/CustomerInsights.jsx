import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerInsights.css';

const CustomerInsight = () => {
  const { VITE_HOST } = import.meta.env;
  const [feedbacks, setFeedbacks] = useState([]);
  const [replyingFeedback, setReplyingFeedback] = useState(null); // Track which feedback is being replied to
  const [error, setError] = useState(null); // Track any errors

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_HOST}/api/feedback`);
        setFeedbacks(response.data);
      } catch (err) {
        console.error('Error fetching feedback:', err);
        setError('Failed to fetch feedback. Please try again later.');
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDeleteFeedback = async (feedbackId) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await axios.delete(`${VITE_HOST}/api/feedback/${feedbackId}`);
        const updatedFeedbacks = feedbacks.filter(feedback => feedback._id !== feedbackId);
        setFeedbacks(updatedFeedbacks);
      } catch (err) {
        console.error('Error deleting feedback:', err);
        setError('Failed to delete feedback. Please try again later.');
      }
    }
  };

  const handleReplyFeedback = (feedbackId) => {
    setReplyingFeedback(feedbackId);
  };

  const handleCancelReply = () => {
    setReplyingFeedback(null);
  };

  const handleSendReply = (feedbackId, replyMessage) => {
    // Simulated sending reply
    console.log(`Sending reply to feedback with ID ${feedbackId}: ${replyMessage}`);
    // Clear reply state
    setReplyingFeedback(null);
  };

  return (
    <div className="customer-insight-container">
      <h2>Customer Insights</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="feedback-list">
        {feedbacks.map(feedback => (
          <div key={feedback._id} className="feedback-item">
            <div className="customer-info">
              <h3>{feedback.name}</h3>
              <p>Email: {feedback.email}</p>
              <p>Rating: {feedback.rating}/5</p>
            </div>
            <div className="customer-comment">
              <p>{feedback.message}</p>
            </div>
            <div className="feedback-actions">
              {replyingFeedback !== feedback._id ? (
                <>
                  <button onClick={() => handleReplyFeedback(feedback._id)}>Reply</button>
                  <button onClick={() => handleDeleteFeedback(feedback._id)}>Delete</button>
                </>
              ) : (
                <div className="reply-form">
                  <textarea rows="3" placeholder="Type your reply..." />
                  <div className="reply-actions">
                    <button onClick={handleCancelReply}>Cancel</button>
                    <button onClick={() => handleSendReply(feedback._id, 'Sample Reply')}>Send</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerInsight;
