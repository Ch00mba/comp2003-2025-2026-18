const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Load variables from .env
dotenv.config();

const app = express();

//middleware to parse
app.use(express.json());

//routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

//Mongo Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error', err));

//start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));