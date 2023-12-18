const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'expense_tracker',
    password: '123456',
    port: 5432,
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
