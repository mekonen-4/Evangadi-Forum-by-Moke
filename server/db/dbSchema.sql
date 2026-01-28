CREATE TABLE users (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL  
);
CREATE TABLE questions (
    id INT NOT NULL AUTO_INCREMENT ,
    questionid VARCHAR(100) NOT NULL UNIQUE ,
    userid INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tag VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id,questionid),
    FOREIGN KEY (userid) REFERENCES users (userid)
);
 
CREATE TABLE answers (
    answerid INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    questionid VARCHAR(100) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    FOREIGN KEY (questionid) REFERENCES questions(questionid),
    FOREIGN KEY (userid) REFERENCES users(userid)
);
-- 1. Users Table (No changes needed)
CREATE TABLE users (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL  
);

-- 2. Questions Table (Standardized column names)
CREATE TABLE questions (
    id INT NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    userid INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tag VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id, questionid),
    FOREIGN KEY (userid) REFERENCES users (userid)
);

-- 3. Answers Table (UPDATED)
CREATE TABLE answers (
    answerid INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    questionid VARCHAR(100) NOT NULL,
    -- Changed to TEXT because 255 characters is too small for forum answers
    answer TEXT NOT NULL, 
    -- Added createdAt for "answered x minutes ago" functionality
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (questionid) REFERENCES questions(questionid) ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
);
