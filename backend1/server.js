const express = require("express");
const pool = require("./database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

const SECRET_KEY = "my_very_secret_key"; // Use a secure key in production

app.use(cors());
app.use(express.json());

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token." });
        req.user = user;
        next();
    });
}

// User signup
app.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "Username is already taken." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user
        await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
            username,
            hashedPassword,
        ]);

        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error." });
    }
});

// User login
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Login attempt:", username); // Log the received username

        // Check if the user exists
        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        console.log("User found:", user.rows); // Log the result of the query

        if (user.rows.length === 0) {
            return res.status(400).json({ message: "Invalid username or password." });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        console.log(password)
        console.log(user.rows[0].password)
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid username or password." });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.rows[0].id, username }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        console.error("Error during login:", err.message); // Log errors
        res.status(500).json({ message: "Server error." });
    }
});

app.put("/api/posts/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        await pool.query(
            "UPDATE posts SET title = $2, content = $3 WHERE id = $1",
            [id, title, content]
        );
        res.json({ message: "Post updated successfully." });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error." });
    }
});

app.delete("/api/posts/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM posts WHERE id = $1", [id]);
        res.json({ message: "Post deleted successfully." });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error." });
    }
});

// Public routes
app.get("/api/posts", async (req, res) => {
    try {
        const posts = await pool.query("SELECT * FROM posts");
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error." });
    }
});

app.get("/api/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        res.json(post.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error." });
    }
});

// Route to delete all posts
app.delete("/api/posts", authenticateToken, async (req, res) => {
    try {
      console.log("DELETE /api/posts invoked by:", req.user);
      await pool.query("DELETE FROM posts");
      console.log("Posts deleted from database");
      res.json({ message: "All posts deleted successfully." });
    } catch (err) {
      console.error("Error deleting posts:", err.message);
      res.status(500).json({ message: "Server error while deleting posts." });
    }
  });

app.post("/api/posts", authenticateToken, async (req, res) => {
    try {
        const { content } = req.body;
        const author = req.user.username;

        const newPost = await pool.query(
            "INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *",
            ["Untitled Post", content, author]
        );
        res.json(newPost.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error." });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
