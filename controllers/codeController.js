const Code = require('../models/Code');

exports.createCode = (req, res) => {
  const newCode = new Code({ ...req.body, user: req.user.id });
  newCode.save().then(code => res.json(code)).catch(err => res.status(500).json({ msg: 'Server error' }));
};


exports.getAllCodes = (req, res) => {
  Code.find()
    .populate('user', 'username')
    .populate({
      path: 'comments.user',
      model: 'User',
      select: 'username'
    })
    .then(codes => res.json(codes))
    .catch(err => res.status(500).json({ msg: 'Server error' }));
};


exports.updateCode = (req, res) => {
  Code.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true })
    .then(code => {
      if (!code) return res.status(404).json({ msg: 'Code not found or you are not authorized to edit this code' });
      res.json(code);
    })
    .catch(err => res.status(404).json({ msg: 'Code not found' }));
};


exports.deleteCode = (req, res) => {
  Code.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    .then(code => {
      if (!code) return res.status(404).json({ msg: 'Code not found or you are not authorized to delete this code' });
      res.json({ success: true });
    })
    .catch(err => res.status(404).json({ msg: 'Code not found' }));
};


exports.addComment = (req, res) => {
  const { text } = req.body;
  const { id } = req.params;

  Code.findById(id)
    .then(code => {
      if (!code) {
        return res.status(404).json({ msg: 'Code not found' });
      }
      const comment = { text, user: req.user.id };
      code.comments.push(comment);
      return code.save();
    })
    .then(savedCode => {
      return Code.findById(savedCode._id)
        .populate({
          path: 'comments.user',
          model: 'User',
          select: 'username'
        });
    })
    .then(populatedCode => {
      const lastComment = populatedCode.comments[populatedCode.comments.length - 1];
      res.json({ ...populatedCode._doc, comments: [lastComment] });
    })
    .catch(err => res.status(500).json({ msg: 'Server error' }));
};


exports.rateCode = (req, res) => {
  const { rating } = req.body;
  const { id } = req.params;

  Code.findById(id)
    .then(code => {
      if (!code) {
        return res.status(404).json({ msg: 'Code not found' });
      }
      code.rating = rating;
      return code.save();
    })
    .then(savedCode => res.json(savedCode))
    .catch(err => res.status(500).json({ msg: 'Server error' }));
};
