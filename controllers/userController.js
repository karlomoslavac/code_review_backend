const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }).then(user => {
    if (!user) return res.status(400).json({ msg: 'User does not exist' });
    if (user.password !== password) return res.status(400).json({ msg: 'Invalid credentials' });

    jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user._id, username: user.username } });
    });
  }).catch(err => {
    res.status(500).json({ msg: 'Server error' });
  });
};


exports.authenticateUser = (req, res) => {
  const { id, username } = req.user;
  res.json({ id, username });
};

