const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory user store (use MongoDB later)
let users = [
  { id: "admin1", password: "admin123", role: "admin" },
  { id: "manager1", password: "manager123", role: "manager" },
  { id: "emp1", password: "emp123", role: "employee" }
];

// Register route
app.post("/register", (req, res) => {
  const { id, password, role } = req.body;
  
  if (!id || !password || !role) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const exists = users.find(user => user.id === id);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ id, password, role });
  res.json({ message: "User registered successfully" });
});

// Login route
app.post("/login", (req, res) => {
  const { id, password, role } = req.body;
  const user = users.find(u => u.id === id && u.password === password && u.role === role);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", role: user.role });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));