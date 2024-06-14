import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        given_name: '',
        last_name: '',
        role_id: ''
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
            const response = await axios.post('http://localhost:3000/signup', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div>
                <label>Given Name:</label>
                <input type="text" name="given_name" value={formData.given_name} onChange={handleChange} />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
            </div>
            <div>
                <label>Role ID:</label>
                <input type="text" name="role_id" value={formData.role_id} onChange={handleChange} />
            </div>
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
