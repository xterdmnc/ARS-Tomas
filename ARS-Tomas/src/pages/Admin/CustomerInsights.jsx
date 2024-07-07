import React, { useState, useEffect } from 'react';
import './CustomerInsights.css';

const CustomerInsight = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [replyingFeedback, setReplyingFeedback] = useState(null); // Track which feedback is being replied to

    useEffect(() => {
        // Simulated API call or database fetch for feedbacks
        // This would typically fetch from a database or server
        // For demo purposes, initializing with sample data
        const initialFeedbacks = [
            { id: 1, name: 'John Doe', rating: 4, comment: 'Great flight experience!' },
            { id: 2, name: 'Jane Smith', rating: 5, comment: 'Excellent service and comfortable seats.' },
            { id: 3, name: 'Michael Lee', rating: 3, comment: 'Average experience, could improve on meal options.' },
            { id: 4, name: 'Sarah Wilson', rating: 2, comment: 'Poor customer service, flight delays.' },
        ];
        setFeedbacks(initialFeedbacks);
    }, []);

    const handleDeleteFeedback = (feedbackId) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            const updatedFeedbacks = feedbacks.filter(feedback => feedback.id !== feedbackId);
            setFeedbacks(updatedFeedbacks);
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
            <div className="feedback-list">
                {feedbacks.map(feedback => (
                    <div key={feedback.id} className="feedback-item">
                        <div className="customer-info">
                            <h3>{feedback.name}</h3>
                            <p>Rating: {feedback.rating}/5</p>
                        </div>
                        <div className="customer-comment">
                            <p>{feedback.comment}</p>
                        </div>
                        <div className="feedback-actions">
                            {!replyingFeedback ? (
                                <>
                                    <button onClick={() => handleReplyFeedback(feedback.id)}>Reply</button>
                                    <button onClick={() => handleDeleteFeedback(feedback.id)}>Delete</button>
                                </>
                            ) : (
                                <div className="reply-form">
                                    <textarea rows="3" placeholder="Type your reply..." />
                                    <div className="reply-actions">
                                        <button onClick={() => handleCancelReply()}>Cancel</button>
                                        <button onClick={() => handleSendReply(feedback.id, 'Sample Reply')}>Send</button>
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
