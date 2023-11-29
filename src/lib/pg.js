const { logPsqlWriter } = require('../shared/logger/logger.psql');
const Pg = require('pg');

const pool = new Pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});

async function fetchPsql(query, ...arr) {
    try {
        const client = await pool.connect();
        const result = await client.query(query, arr);
        client.release();
        logPsqlWriter(200, result.command, query);
        return result.rows;
    } catch (error) {
        const stackLines = error.stack.split('\n');
        if (stackLines.length >= 2) {
            const line = stackLines[4].trim();
            logPsqlWriter(400, 'unknown', query, line);
            return {
                status: 400,
                error: error.stack.split('at async')[error.stack.split('at async').length - 1],
                query,
            };
        }
    }
}

module.exports = {
    fetchPsql,
};
