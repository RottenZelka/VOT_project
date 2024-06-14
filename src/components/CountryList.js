import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryList = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('http://localhost:3000/countries');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    return (
        <ul>
            {countries.map((country, index) => (
                <li key={index}>{country}</li>
            ))}
        </ul>
    );
};

export default CountryList;
