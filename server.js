require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const codeRoutes = require('./routes/codes');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use('/users', userRoutes);
app.use('/codes', codeRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected: ' + mongoURI))
  .catch(err => console.log('MongoDB connection error: ', err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
