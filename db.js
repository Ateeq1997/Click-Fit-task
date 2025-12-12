// db.js - PostgreSQL Database Connection for Click Fit
// Using environment variables for secure credential management

require('dotenv').config();

const { Pool } = require('pg');

// Create connection pool using environment variables from .env file
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test the connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        console.error('Please check:');
        console.error('1. PostgreSQL is running');
        console.error('2. Database "clickfit_db" exists');
        console.error('3. .env file exists with correct credentials');
        return;
    }
    console.log('✓ Successfully connected to PostgreSQL database');
    release();
});

// Handle pool errors
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = pool;