import React from 'react';

const UserList = ({ users, onDelete, onEdit }) => {
    return (
        <div className="user-list-container">
            {users.map((user) => (
                <div key={user._id} className="user-card">
                    <div className="user-details">
                        <h3>{user.username}</h3>
                        <p>{user.firstName} {user.lastName}</p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                    </div>
                    <div className="user-actions">
                        <button onClick={() => onEdit(user)}>Edit</button>
                        <button onClick={() => onDelete(user._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserList;
