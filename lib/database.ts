/**
 * mysql database configuration
 */
const mysql = require('mysql');
    const connection = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'jarrar',
        database: 'demo',
    });
module.exports = connection;
