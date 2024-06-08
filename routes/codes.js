const express = require('express');
const router = express.Router();
const codeController = require('../controllers/codeController');
const auth = require('../middleware/auth');

router.post('/', auth, codeController.createCode);
router.get('/', codeController.getAllCodes);
router.put('/:id', auth, codeController.updateCode);
router.delete('/:id', auth, codeController.deleteCode);

router.post('/:id/comments', auth, codeController.addComment); 
router.put('/:id/rate', auth, codeController.rateCode); 

module.exports = router;
