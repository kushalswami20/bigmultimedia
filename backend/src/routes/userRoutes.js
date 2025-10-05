const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createOrUpdateUser);
router.get('/', userController.getAllUsers);
router.get('/:instagramId', userController.getUserById);
router.delete('/:instagramId', userController.deleteUser);

module.exports = router;