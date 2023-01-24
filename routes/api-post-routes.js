const express = require('express');
const {
  getPost,
  addPost,
  deletePost,
  getPosts
} = require('../controllers/api-post-controller');

const router = express.Router();

router.get('/api/posts/:id', getPost);
router.post('/api/add-post', addPost);
router.delete('/api/posts/:id', deletePost);
router.get('/api/posts', getPosts);

module.exports = router;