import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AuditLog.css';

const AuditLog = () => {
    const [auditLogs, setAuditLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAuditLogs = async () => {
            try {
                const response = await axios.get('/api/auditlogs');
                if (response.data.success) {
                    setAuditLogs(response.data.auditLogs);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError(`Error fetching audit logs: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchAuditLogs();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="audit-log-container">
            <h1>Audit Logs</h1>
            <table className="audit-log-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Action</th>
                        <th>Details</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {auditLogs.map(log => (
                        <tr key={log._id}>
                            <td>{log.userId.username}</td>
                            <td>{log.action}</td>
                            <td>{log.details}</td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AuditLog;
