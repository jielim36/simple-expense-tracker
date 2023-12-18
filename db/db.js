const { Pool } = require('pg');
const { DBUSER, DBHOST, DBNAME, DBPASSWORD, DBPORT } = require('../config/config');

const pool = new Pool({
    user: DBUSER,
    host: DBHOST,
    database: DBNAME,
    password: DBPASSWORD,
    port: DBPORT,
});

const query = async (sql, params) => {
    const client = await pool.connect();

    try {
        const result = await client.query(sql, params);
        return result.rows;
    } finally {
        client.release();
    }
};

module.exports = {
    query,
};
