const express = require('express');
const router = express.Router();
const controller = require('../controllers/ahpController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, controller.index);
router.post('/store', auth, controller.store);
router.get('/hasil', auth, controller.hasil);
router.get('/rekomendasi', auth, controller.rekomendasi);
router.get('/reset', auth, controller.reset);
module.exports = router;