-- Create database (optional)
CREATE DATABASE IF NOT EXISTS clickfit_db;
USE clickfit_db;

-- Drop table if exists (for clean setup)
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drop stored procedure if exists
DROP PROCEDURE IF EXISTS addUser;

-- Change delimiter to create stored procedure
DELIMITER $$

-- Create stored procedure addUser
CREATE PROCEDURE addUser(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_type VARCHAR(50),
    IN p_active TINYINT(1)
)
BEGIN
    INSERT INTO users (email, password, type, active)
    VALUES (p_email, p_password, p_type, p_active);
    
    -- Return the newly created user ID
    SELECT LAST_INSERT_ID() as userId;
END$$

DELIMITER ;

-- Call stored procedure to insert a new user (example)
CALL addUser('john.doe@example.com', 'hashed_password_123', 'admin', 1);
CALL addUser('jane.smith@example.com', 'hashed_password_456', 'user', 1);
CALL addUser('test.user@example.com', 'hashed_password_789', 'user', 0);

-- Verify the insertions
SELECT * FROM users;

-- Additional example calls to stored procedure
CALL addUser('fitness.coach@clickfit.com', 'secure_pass_321', 'coach', 1);
CALL addUser('member@clickfit.com', 'member_pass_654', 'member', 1);