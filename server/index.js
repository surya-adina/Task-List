const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const TaskItemRoute = require('./routes/taskItems');

let isConnected = false;

async function connectDB() {
    if (isConnected) return;
    await mongoose.connect(process.env.DB_CONNECT, {
        serverSelectionTimeoutMS: 5000,
        bufferCommands: false,
    });
    isConnected = true;
}

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('DB connection error:', err);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

app.use('/', TaskItemRoute);

module.exports = app;
