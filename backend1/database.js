const { Pool } = require("pg");

// Configure the connection pool
const pool = new Pool({
    user: "postgres", // Replace with your PostgreSQL username
    password: "test1234", // Replace with your PostgreSQL password
    database: "testWad", // Replace with your database name
    host: "localhost",
    port: "5432",
});

// Helper function to execute queries
const execute = async (query) => {
    try {
        await pool.connect(); // Establish connection
        await pool.query(query); // Execute the query
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

// SQL query to create the "users" table
const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR(255) UNIQUE NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "create_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

// SQL query to create the "posts" table
const createPostsTableQuery = `
    CREATE TABLE IF NOT EXISTS "posts" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL,
        "content" TEXT NOT NULL,
        "author" VARCHAR(100) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
        "create_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "tags" TEXT[] DEFAULT '{}',
        "likes" INT DEFAULT 0,
        "image_url" VARCHAR(255)
    );
`;

// Execute table creation queries
execute(createUsersTableQuery).then((result) => {
    if (result) {
        console.log('If not exists, created the "users" table');
    }
});

execute(createPostsTableQuery).then((result) => {
    if (result) {
        console.log('If not exists, created the "posts" table');
    }
});

module.exports = pool;
