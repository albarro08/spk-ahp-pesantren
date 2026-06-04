const express = require('express');
const router = express.Router();
const controller = require('../controllers/kriteriaController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, controller.index);
router.post('/store', auth, controller.store);
router.put('/update/:id', auth, controller.update);
router.delete('/delete/:id', auth, controller.delete);

module.exports = router;