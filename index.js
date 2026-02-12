const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const connectDb = require("./connectDb/connectDb");
const path = require("path");
const mongoose = require("mongoose");

app.use(express.static(path.join(__dirname, "FrontEnd")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "FrontEnd", "index.html"));
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/othman", (req, res) => {
  res.send("Hello othman 👋");
});

app.get("/infos", async (req, res) => {
    try {
        const users = await mongoose.connection.db.collection('users').find().toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
connectDb()

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});