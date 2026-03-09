const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const TaskItemRoute = require('./routes/taskItems');

mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

app.use('/', TaskItemRoute);

module.exports = app;
