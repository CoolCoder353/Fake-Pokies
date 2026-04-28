const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: "Username and password are required" });
    }
    let user = db.login_user(req.body.username, req.body.password);
    if (user) {
        return res.json({ message: "Login successful", user: user.serialize() });
    } else {
        return res.status(401).json({ error: "Invalid username or password" });
    }
});

router.post("/register", (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: "Username and password are required" });
    }
    let user = db.register_user(req.body.username, req.body.password);
    if (user) {
        return res.status(201).json({ message: "User registered successfully", user: user.serialize() });
    } else {
        return res.status(400).json({ error: "Username already exists" });
    }
});

module.exports = (db) => {
    return router;
};
