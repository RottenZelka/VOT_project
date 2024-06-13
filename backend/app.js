const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');
const { hashPassword, verifyPassword } = require('./passwordUtils');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const generateSecretKey = () => {
    return crypto.randomBytes(64).toString('hex');
}

const JWT_SECRET = generateSecretKey();

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { username, password, given_name, last_name, role_id } = req.body;
    try {
        const passwordHash = await hashPassword(password);

        const sql = 'INSERT INTO users (username, password_hash, given_name, last_name, role_id) VALUES (?, ?, ?, ?, ?)';
        const connection = await pool.getConnection();
        await connection.query(sql, [username, passwordHash, given_name, last_name, role_id]);
        connection.release();

        // Generate JWT token
        const token = jwt.sign({ username, role_id, user_id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

// Function to record the application in the database
const recordApplication = async (schoolId, userId) => {
    const sql = 'INSERT INTO school_applicants (school_id, student_id) VALUES (?, ?)';
    const connection = await pool.getConnection();
    await connection.query(sql, [schoolId, userId]);
    connection.release();
};

const getCountryIdByName = async (countryName) => {
    const sql = 'SELECT country_id FROM country WHERE country_name = ?';
    const connection = await pool.getConnection();
    const results = await connection.query(sql, [countryName]);
    connection.release();

    if (results.length === 0) {
        throw new Error('Country not found');
    }
    return results[0].country_id;
};

const getTypeIdByName = async (type_name) => {
    const sql = 'SELECT type_id FROM schools_type WHERE type_name = ?';
    const connection = await pool.getConnection();
    const results = await connection.query(sql, [type_name]);
    connection.release();

    if (results.length === 0) {
        throw new Error('School type not found');
    }
    return results[0].type_id;
};

const generateSchoolToken = ({ abbreviation, school_name, school_id }) => {
    return jwt.sign({ abbreviation, school_name, school_id }, JWT_SECRET, { expiresIn: '1h' });
};

app.post('/loginSchool', async (req, res) => {
    const { abbreviation, password } = req.body;

    const sql = 'SELECT * FROM schools WHERE abbreviation = ?';
    const connection = await pool.getConnection();
    const results = await connection.query(sql, [abbreviation]);
    connection.release();

    if (results.length === 0) {
        res.status(404).json({ message: 'School not found' });
        return;
    }

    const school = results[0];
    const passwordMatch = await verifyPassword(password, school.password_hash);

    if (passwordMatch) {
        const token = generateSchoolToken({
            abbreviation: school.abbreviation,
            school_name: school.school_name,
            school_id: school.school_id
        });
        res.status(200).json({ message: 'Login successful', token });
    } else {
        res.status(401).json({ message: 'Invalid password' });
    }
});

app.post('/signupSchool', async (req, res) => {
    const { abbreviation, password, school_name, country_name, type_name } = req.body;
    try {
        const country_id = await getCountryIdByName(country_name);
        const type_id = await getTypeIdByName(type_name);
        const passwordHash = await hashPassword(password);

        const sql = 'INSERT INTO schools (abbreviation, password_hash, school_name, country_id, type_id) VALUES (?, ?, ?, ?, ?)';
        const connection = await pool.getConnection();
        const results = await connection.query(sql, [abbreviation, passwordHash, school_name, country_id, type_id]);
        const schoolId = results.insertId;
        connection.release();

        const token = generateSchoolToken({
            abbreviation,
            school_name,
            school_id: schoolId
        });
        res.status(201).json({ message: 'School created successfully', token });
    } catch (error) {
        console.error('Error creating school:', error);
        res.status(500).json({ message: 'Error creating school' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    const connection = await pool.getConnection();
    const results = await connection.query(sql, [username]);
    connection.release();

    if (results.length === 0) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const user = results[0];
    const passwordMatch = await verifyPassword(password, user.password_hash);

    if (passwordMatch) {
        const token = jwt.sign({ username: user.username, role_id: user.role_id, user_id: user.user_id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } else {
        res.status(401).json({ message: 'Invalid password' });
    }
});

app.get('/countries', async (req, res) => {
    try {
        const query = 'SELECT country_name FROM country';
        const connection = await pool.getConnection();
        const results = await connection.query(query);
        connection.release();

        const countries = results.map(result => result.country_name);
        res.json(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/school_types', async (req, res) => {
    try {
        const query = 'SELECT type_name FROM schools_type';
        const connection = await pool.getConnection();
        const results = await connection.query(query);
        connection.release();

        const schoolTypes = results.map(result => result.type_name);
        res.json(schoolTypes);
    } catch (error) {
        console.error('Error fetching school types:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/schools', async (req, res) => {
    try {
        const query = 'SELECT * FROM schools';
        const connection = await pool.getConnection();
        const results = await connection.query(query);
        connection.release();

        res.json(results);
    } catch (error) {
        console.error('Error fetching schools:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/countries_all', async (req, res) => {
    try {
        const query = 'SELECT country_id, country_name FROM country';
        const connection = await pool.getConnection();
        const results = await connection.query(query);
        connection.release();

        const countries = results.map(result => ({
            country_id: result.country_id,
            country_name: result.country_name
        }));
        res.json(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/school_types_all', async (req, res) => {
    try {
        const query = 'SELECT type_id, type_name FROM schools_type';
        const connection = await pool.getConnection();
        const results = await connection.query(query);
        connection.release();

        res.json(results);
    } catch (error) {
        console.error('Error fetching school types:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const getCountryNameById = async (countryId) => {
    const sql = 'SELECT country_name FROM country WHERE country_id = ?';
    const connection = await pool.getConnection();
    const results = await connection.query(sql, [countryId]);
    connection.release();

    if (results.length === 0) {
        return null;
    }
    return results[0].country_name;
};

const getTypeNameById = async (typeId) => {
    const sql = 'SELECT type_name FROM schools_type WHERE type_id = ?';
    const connection = await pool.getConnection();
    const results = await connection.query(sql, [typeId]);
    connection.release();

    if (results.length === 0) {
        return null;
    }
    return results[0].type_name;
};

app.get('/schools_all', async (req, res) => {
    try {
        const query = 'SELECT school_id, school_name, abbreviation, country_id, type_id FROM schools';
        const connection = await pool.getConnection();
        const results = await connection.query(query);
        connection.release();

        const schoolsWithDetails = await Promise.all(
            results.map(async school => {
                const country_name = await getCountryNameById(school.country_id);
                const type_name = await getTypeNameById(school.type_id);

                return {
                    school_id: school.school_id,
                    school_name: school.school_name,
                    abbreviation: school.abbreviation,
                    country_name,
                    type_name
                };
            })
        );

        res.json(schoolsWithDetails);
    } catch (error) {
        console.error('Error fetching schools:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
