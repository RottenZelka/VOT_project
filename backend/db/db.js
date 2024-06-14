const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin',
    database: 'one_id',
    connectionLimit: 5, // Adjust this based on your needs
    multipleStatements: true
});

module.exports = pool;