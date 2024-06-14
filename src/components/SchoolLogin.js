import React, { useState } from 'react';
import axios from 'axios';

const SchoolLogin = () => {
    const [abbreviation, setAbbreviation] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/loginSchool', { abbreviation, password });
            console.log(response.data);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Abbreviation:</label>
                <input type="text" value={abbreviation} onChange={(e) => setAbbreviation(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default SchoolLogin;
