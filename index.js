const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const authRoutes = require("./routes/auth");
const postRoutes = require('./routes/post')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to DB
connectDb();

// Middleware
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse form-data

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use("/api/auth", authRoutes);
app.use('/api/posts', postRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
