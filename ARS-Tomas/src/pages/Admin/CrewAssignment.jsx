import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('pilots');

    useEffect(() => {
        const fetchCrew = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_HOST}/api/crew`);
                console.log(response.data); // Log the data to check its structure
                
                // Check if response.data is an object with the expected keys
                if (response.data && typeof response.data === 'object') {
                    setCrew(response.data);
                } else {
                    console.error('Response data is not in the expected format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching crew data:', error);
            }
        };
        
        fetchCrew();
    }, []);

    const handleAddCrewMember = async () => {
        if (newCrewMember.trim() !== '') {
            if (window.confirm(`Are you sure you want to add ${newCrewMember} to ${selectedCategory}?`)) {
                const newMember = { name: newCrewMember, category: selectedCategory };
                const response = await axios.post(`${import.meta.env.VITE_HOST}/api/crew`, newMember);
                setCrew(prevCrew => ({
                    ...prevCrew,
                    [selectedCategory]: [
                        ...prevCrew[selectedCategory],
                        response.data,
                    ],
                }));
                setNewCrewMember('');
            }
        }
    };

    const handleDeleteCrewMember = async (category, memberId) => {
        if (window.confirm('Are you sure you want to remove this crew member?')) {
            await axios.delete(`${import.meta.env.VITE_HOST}/api/crew/${memberId}`);
            const updatedCrew = crew[category].filter(member => member._id !== memberId);
            setCrew(prevCrew => ({
                ...prevCrew,
                [category]: updatedCrew,
            }));
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSearchTerm(''); // Clear the search term when changing categories
    };

    const filteredCrew = crew[selectedCategory].filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Crew Member"
                    className="search-input"
                />
                <ul>
                    {filteredCrew.map(member => (
                        <li key={member._id}>
                            {member.name}
                            <button onClick={() => handleDeleteCrewMember(selectedCategory, member._id)}>Remove</button>
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
