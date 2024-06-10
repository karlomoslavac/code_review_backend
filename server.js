require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const codeRoutes = require('./routes/codes');

const app = express();
const port = process.env.PORT || 1986;

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/codes', codeRoutes);

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected: ' + mongoURI))
  .catch(err => console.log('MongoDB connection error: ', err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
