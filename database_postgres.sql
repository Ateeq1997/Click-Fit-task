-- Create database (run this separately first)
-- CREATE DATABASE clickfit_db;

-- Connect to the database and run the following:

-- Drop table if exists (for clean setup)
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    active SMALLINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drop function/procedure if exists
DROP FUNCTION IF EXISTS addUser(VARCHAR, VARCHAR, VARCHAR, SMALLINT);

-- Create stored procedure/function addUser
CREATE OR REPLACE FUNCTION addUser(
    p_email VARCHAR(255),
    p_password VARCHAR(255),
    p_type VARCHAR(50),
    p_active SMALLINT DEFAULT 1
)
RETURNS TABLE(userId INT) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO users (email, password, type, active)
    VALUES (p_email, p_password, p_type, p_active)
    RETURNING users.userId;
END;
$$ LANGUAGE plpgsql;

-- Call function to insert new users (examples)
SELECT * FROM addUser('john.doe@example.com', 'hashed_password_123', 'admin', 1);
SELECT * FROM addUser('jane.smith@example.com', 'hashed_password_456', 'user', 1);
SELECT * FROM addUser('test.user@example.com', 'hashed_password_789', 'user', 0);

-- Verify the insertions
SELECT * FROM users;

-- Additional example calls to the function
SELECT * FROM addUser('fitness.coach@clickfit.com', 'secure_pass_321', 'coach', 1);
SELECT * FROM addUser('member@clickfit.com', 'member_pass_654', 'member', 1);