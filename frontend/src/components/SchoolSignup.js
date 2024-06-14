import React, { useState } from 'react';
import axios from 'axios';

const SchoolSignup = () => {
    const [formData, setFormData] = useState({
        abbreviation: '',
        password: '',
        school_name: '',
        country_name: '',
        type_name: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/signupSchool', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Abbreviation:</label>
                <input type="text" name="abbreviation" value={formData.abbreviation} onChange={handleChange} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div>
                <label>School Name:</label>
                <input type="text" name="school_name" value={formData.school_name} onChange={handleChange} />
            </div>
            <div>
                <label>Country Name:</label>
                <input type="text" name="country_name" value={formData.country_name} onChange={handleChange} />
            </div>
            <div>
                <label>Type Name:</label>
                <input type="text" name="type_name" value={formData.type_name} onChange={handleChange} />
            </div>
            <button type="submit">Signup</button>
        </form>
    );
};

export default SchoolSignup;
