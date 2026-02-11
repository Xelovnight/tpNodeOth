const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const connectDb = require("./connectDb/connectDb");
const path = require("path");

app.use(express.static(path.join(__dirname, "FrontEnd")));


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

connectDb()

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "FrontEnd", "index.html"));
});

app.get("/othman", (req, res) => {
  res.send("Hello othman 👋");
});

