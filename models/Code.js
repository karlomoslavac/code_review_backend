const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  comments: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, text: String }],
  rating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Code', CodeSchema);