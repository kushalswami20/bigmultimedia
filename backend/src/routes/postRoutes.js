const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/', postController.savePosts);
router.get('/:instagramId', postController.getPostsByUser);

module.exports = router;