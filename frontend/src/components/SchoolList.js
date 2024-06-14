import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SchoolList = () => {
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await axios.get('http://localhost:3000/schools');
                setSchools(response.data);
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };

        fetchSchools();
    }, []);

    return (
        <ul>
            {schools.map((school, index) => (
                <li key={index}>{school.school_name} ({school.abbreviation})</li>
            ))}
        </ul>
    );
};

export default SchoolList;
