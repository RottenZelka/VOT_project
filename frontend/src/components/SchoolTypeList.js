import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SchoolTypeList = () => {
    const [schoolTypes, setSchoolTypes] = useState([]);

    useEffect(() => {
        const fetchSchoolTypes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/school_types');
                setSchoolTypes(response.data);
            } catch (error) {
                console.error('Error fetching school types:', error);
            }
        };

        fetchSchoolTypes();
    }, []);

    return (
        <ul>
            {schoolTypes.map((type, index) => (
                <li key={index}>{type}</li>
            ))}
        </ul>
    );
};

export default SchoolTypeList;
