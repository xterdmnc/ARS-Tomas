import React, { useState, useEffect } from 'react';
import './CrewAssignment.css';

const initialCrew = {
    pilots: [],
    coPilots: [],
    flightAttendants: [],
    groundCrew: [],
};

const CrewAssignment = () => {
    const [crew, setCrew] = useState(initialCrew);
    const [newCrewMember, setNewCrewMember] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('pilots');

    useEffect(() => {
        // Simulated API call or database fetch for initial crew data
        // This would typically fetch from a database or server
        // For demo purposes, initializing with sample data
        const initialData = {
            pilots: [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Smith' },
            ],
            coPilots: [
                { id: 3, name: 'James Brown' },
                { id: 4, name: 'Emily Johnson' },
            ],
            flightAttendants: [
                { id: 5, name: 'Michael Lee' },
                { id: 6, name: 'Sarah Wilson' },
            ],
            groundCrew: [
                { id: 7, name: 'David Lee' },
                { id: 8, name: 'Lily Chen' },
            ],
        };
        setCrew(initialData);
    }, []);

    const handleAddCrewMember = () => {
        if (newCrewMember.trim() !== '') {
            if (window.confirm(`Are you sure you want to add ${newCrewMember} to ${selectedCategory}?`)) {
                setCrew(prevCrew => ({
                    ...prevCrew,
                    [selectedCategory]: [
                        ...prevCrew[selectedCategory],
                        { id: Date.now(), name: newCrewMember },
                    ],
                }));
                setNewCrewMember('');
            }
        }
    };

    const handleDeleteCrewMember = (category, memberId) => {
        if (window.confirm(`Are you sure you want to remove this crew member?`)) {
            const updatedCrew = crew[category].filter(member => member.id !== memberId);
            setCrew(prevCrew => ({
                ...prevCrew,
                [category]: updatedCrew,
            }));
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="crew-assignment-container">
            <h2>Crew Management</h2>
            <div className="crew-categories">
                <button
                    className={selectedCategory === 'pilots' ? 'active' : ''}
                    onClick={() => handleCategoryChange('pilots')}
                >
                    Pilots
                </button>
                <button
                    className={selectedCategory === 'coPilots' ? 'active' : ''}
                    onClick={() => handleCategoryChange('coPilots')}
                >
                    Co-Pilots
                </button>
                <button
                    className={selectedCategory === 'flightAttendants' ? 'active' : ''}
                    onClick={() => handleCategoryChange('flightAttendants')}
                >
                    Flight Attendants
                </button>
                <button
                    className={selectedCategory === 'groundCrew' ? 'active' : ''}
                    onClick={() => handleCategoryChange('groundCrew')}
                >
                    Ground Crew
                </button>
            </div>
            <div className="crew-list">
                <h3>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h3>
                <ul>
                    {crew[selectedCategory].map(member => (
                        <li key={member.id}>
                            {member.name}
                            <button onClick={() => handleDeleteCrewMember(selectedCategory, member.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <div className="add-crew-member">
                    <input
                        type="text"
                        value={newCrewMember}
                        onChange={(e) => setNewCrewMember(e.target.value)}
                        placeholder={`Enter ${selectedCategory.slice(0, -1)} Name`}
                    />
                    <button onClick={handleAddCrewMember}>Add {selectedCategory.slice(0, -1)}</button>
                </div>
            </div>
        </div>
    );
};

export default CrewAssignment;
