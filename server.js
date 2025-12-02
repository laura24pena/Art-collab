const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Example API endpoint for login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Temporary demo logic
  if (email === "test@artcollab.com" && password === "1234") {
    res.json({ success: true, message: "Login successful!" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});