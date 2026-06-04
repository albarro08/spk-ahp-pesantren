const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const laporanController = require('../controllers/laporanController');

router.get('/', auth, laporanController.print);

module.exports = router;