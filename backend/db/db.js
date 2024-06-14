const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'one_id',
    connectionLimit: 5,
    multipleStatements: true
});

module.exports = pool;