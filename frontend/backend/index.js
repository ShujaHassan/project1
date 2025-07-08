const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path"); // ✅ MISSING IMPORT

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ✅ uses 'path'

// DB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dashboard",
});

// ✅ Login Route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(401).json({ error: "User not found" });

    const user = results[0];

    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, "your-secret-key", { expiresIn: "1h" });
    res.json({ token });
  });
});

// ✅ Add User Route
app.post("/api/users/add", (req, res) => {
  const { name, email, username, password, role, status } = req.body;

  const checkQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkQuery, [username], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error while checking username" });

    if (results.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const insertQuery = `
      INSERT INTO users (name, email, username, password, role, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(insertQuery, [name, email, username, password, role, status], (err) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).json({ error: "Failed to add user" });
      }

      res.status(201).json({ message: "User added successfully" });
    });
  });
});

// ✅ Get All Users
app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM users ORDER BY id DESC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

// ✅ Update User
app.put("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email, username, password, role, status } = req.body;

  const updateQuery = password
    ? `UPDATE users SET name=?, email=?, username=?, password=?, role=?, status=? WHERE id=?`
    : `UPDATE users SET name=?, email=?, username=?, role=?, status=? WHERE id=?`;

  const values = password
    ? [name, email, username, password, role, status, userId]
    : [name, email, username, role, status, userId];

  db.query(updateQuery, values, (err) => {
    if (err) return res.status(500).json({ error: "Database update failed" });
    res.json({ message: "User updated successfully" });
  });
});

// ✅ Get Single User
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(results[0]);
  });
});

// ✅ Delete User
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete user" });
    res.json({ message: "User deleted successfully" });
  });
});

// ✅ Routes
const sessionRoutes = require("./routes/sessions");
app.use("/api/sessions", sessionRoutes);

const sessionDataRoutes = require("./routes/sessionData");
app.use("/api/session-data", sessionDataRoutes);

//speakers
const speakerRoutes = require("./routes/speakers");
app.use("/api/speakers", speakerRoutes);

//Home Banner
const bannerRoutes = require("./routes/bannerRoutes");
app.use("/api/banner", bannerRoutes);

//about
const aboutRoutes = require("./routes/about");
app.use("/api/about", aboutRoutes);

//video api 
const videoRoutes = require("./routes/video");
app.use("/api/videos", videoRoutes);

//president
const presidentRoutes = require("./routes/president");
app.use("/api", presidentRoutes);

//initiative
const initiativeRoutes = require("./routes/initiativeRoutes");
app.use("/api/initiatives", initiativeRoutes);

//sovapa api
const sovapaRoutes = require("./routes/sovapa");
app.use("/api/sovapa", sovapaRoutes);

//sponsor api
const sponsorRoutes = require("./routes/sponsor");
app.use("/api/sponsor", sponsorRoutes);

//facilities api
const facilitiesRoute = require("./routes/facilities")
app.use("/api/facilities", facilitiesRoute);

//feedback api
const feedbackRoutes = require("./routes/feedback");
app.use("/api/feedback", feedbackRoutes);

// ✅ Serve uploads folder (again, not needed twice)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



// ✅ Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
